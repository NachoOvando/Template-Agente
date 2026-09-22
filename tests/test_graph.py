"""Tests del grafo, sin pegarle nunca a Gemini ni a Postgres reales —
ver `tests/fakes.py`. Casos requeridos por el checklist del subagente `tester`."""

import asyncio
from contextlib import contextmanager

import pytest

from graph.build_graph import build_graph
from graph.state import AgentState, ExtractedSlots, VisitorProfile
from services.conversation_service import ConversationService
from tests.fakes import FakeLLMProvider


@contextmanager
def fake_db_session_factory():
    yield None


def new_state(message: str) -> AgentState:
    return AgentState(
        session_id="test-session",
        user_message=message,
        visitor_profile=VisitorProfile(),
        missing_slot=None,
        retrieved_chunks=[],
        response="",
    )


@pytest.mark.asyncio
async def test_dato_faltante_pregunta_en_vez_de_asumir(monkeypatch):
    """Si falta un slot obligatorio, el agente pregunta y nunca llega a generar
    una respuesta con Gemini (rutea directo a ask_clarifying, no a generate_response)."""
    monkeypatch.setattr(
        "graph.nodes.search_similar_chunks", lambda *a, **k: pytest.fail("no debería llamarse")
    )
    llm = FakeLLMProvider(extract_results=[ExtractedSlots(interes="trekking", tipo_grupo=None)])
    graph = build_graph(llm, fake_db_session_factory)

    result = await graph.ainvoke(new_state("quiero hacer trekking"))

    assert result["missing_slot"] == "tipo_grupo"
    assert "con quién" in result["response"].lower()
    assert llm.generate_calls == []  # generate_response_node nunca se ejecutó


@pytest.mark.asyncio
async def test_sin_contexto_no_alucina(monkeypatch):
    """Si retrieve_context_node no trae chunks relevantes, generate_response_node
    tiene que recibir la marca explícita de 'sin resultados' en el prompt —
    es lo único que garantiza el guardrail anti-alucinación (regla #2)."""
    monkeypatch.setattr("graph.nodes.search_similar_chunks", lambda db, embedding: [])
    llm = FakeLLMProvider(
        extract_results=[ExtractedSlots(interes="trekking", tipo_grupo="familia")],
        generate_result="No tengo información sobre eso todavía.",
    )
    graph = build_graph(llm, fake_db_session_factory)

    result = await graph.ainvoke(new_state("¿hay algo para hacer en la luna?"))

    assert result["retrieved_chunks"] == []
    assert len(llm.generate_calls) == 1
    _, user_prompt = llm.generate_calls[0]
    assert "sin resultados relevantes" in user_prompt.lower()
    assert result["response"] == "No tengo información sobre eso todavía."


@pytest.mark.asyncio
async def test_base_vacia_no_rompe(monkeypatch):
    """La app no debe romper si pgvector no tiene chunks cargados todavía."""
    monkeypatch.setattr("graph.nodes.search_similar_chunks", lambda db, embedding: [])
    llm = FakeLLMProvider(
        extract_results=[ExtractedSlots(interes="trekking", tipo_grupo="familia")]
    )
    graph = build_graph(llm, fake_db_session_factory)

    result = await graph.ainvoke(new_state("¿qué me recomendás?"))

    assert result["response"] == "respuesta fake"


@pytest.mark.asyncio
async def test_consistencia_visitor_profile_no_diverge(monkeypatch):
    """Una misma sesión no debe terminar con dos VisitorProfile divergentes: si
    un slot ya se llenó, un mensaje posterior con un valor distinto no lo pisa."""
    monkeypatch.setattr("graph.nodes.search_similar_chunks", lambda db, embedding: [])
    llm = FakeLLMProvider(
        extract_results=[
            ExtractedSlots(interes="trekking", tipo_grupo=None),
            ExtractedSlots(interes="gastronomía", tipo_grupo="amigos"),
        ]
    )
    service = ConversationService(llm, db_session_factory=fake_db_session_factory)

    await service.handle_message("session-1", "quiero hacer trekking")
    await service.handle_message("session-1", "en realidad prefiero gastronomía, voy con amigos")

    final_profile = service._sessions["session-1"]["visitor_profile"]
    assert final_profile.interes == "trekking"  # primera mención gana, no se pisa
    assert final_profile.tipo_grupo == "amigos"  # este sí estaba vacío, se llena


@pytest.mark.asyncio
async def test_mensajes_concurrentes_misma_sesion_no_se_pisan(monkeypatch):
    """Regresión: sin lock por sesión, dos mensajes casi simultáneos a la misma
    sesión podían perder el turno anterior entero (no solo el visitor_profile) —
    ver BITACORA.md. Se fuerza el entrelazado con un pequeño sleep dentro de
    extract_structured, para que el segundo `get` ocurra antes del primer `set`."""
    monkeypatch.setattr("graph.nodes.search_similar_chunks", lambda db, embedding: [])

    class SlowFakeLLMProvider(FakeLLMProvider):
        async def extract_structured(self, system_prompt, user_prompt, schema):
            await asyncio.sleep(0.01)
            return await super().extract_structured(system_prompt, user_prompt, schema)

    llm = SlowFakeLLMProvider(
        extract_results=[
            ExtractedSlots(interes="trekking", tipo_grupo=None),
            ExtractedSlots(interes=None, tipo_grupo="familia"),
        ]
    )
    service = ConversationService(llm, db_session_factory=fake_db_session_factory)

    await asyncio.gather(
        service.handle_message("session-1", "quiero hacer trekking"),
        service.handle_message("session-1", "voy con mi familia"),
    )

    final_profile = service._sessions["session-1"]["visitor_profile"]
    assert final_profile.interes == "trekking"  # no se pierde por la carrera
    assert final_profile.tipo_grupo == "familia"


@pytest.mark.asyncio
async def test_retrieval_usa_interes_de_turno_anterior(monkeypatch):
    """Regresión: retrieve_context_node embebía solo el mensaje del turno
    actual. Si el usuario dice el interés en el turno 1 ("termas") y en el
    turno 2 solo contesta el slot que faltaba ("voy en pareja"), la búsqueda
    tiene que seguir apuntando a "termas", no perder el tema — ver BITACORA.md."""
    monkeypatch.setattr("graph.nodes.search_similar_chunks", lambda db, embedding: [])
    llm = FakeLLMProvider(
        extract_results=[
            ExtractedSlots(interes="termas", tipo_grupo=None),
            ExtractedSlots(interes=None, tipo_grupo="pareja"),
        ]
    )
    service = ConversationService(llm, db_session_factory=fake_db_session_factory)

    await service.handle_message("session-1", "quiero ir a termas")
    await service.handle_message("session-1", "voy en pareja")

    assert len(llm.embed_calls) == 1  # el primer turno no llega a retrieve_context
    [query_texts] = llm.embed_calls
    assert "termas" in query_texts[0]


@pytest.mark.asyncio
async def test_dos_sesiones_no_comparten_perfil(monkeypatch):
    monkeypatch.setattr("graph.nodes.search_similar_chunks", lambda db, embedding: [])
    llm = FakeLLMProvider(
        extract_results=[
            ExtractedSlots(interes="trekking", tipo_grupo=None),
            ExtractedSlots(interes="termas", tipo_grupo=None),
        ]
    )
    service = ConversationService(llm, db_session_factory=fake_db_session_factory)

    await service.handle_message("session-a", "quiero hacer trekking")
    await service.handle_message("session-b", "quiero ir a las termas")

    assert service._sessions["session-a"]["visitor_profile"].interes == "trekking"
    assert service._sessions["session-b"]["visitor_profile"].interes == "termas"
