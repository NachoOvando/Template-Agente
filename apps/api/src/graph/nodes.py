"""Nodos del grafo. Cada uno tiene una única responsabilidad — ver la tabla de
nodos en CLAUDE.md. Los nodos que necesitan `LLMProvider` o una sesión de DB se
construyen con una factory (`make_*_node`) para no depender de estado global."""

from collections.abc import Callable
from contextlib import AbstractContextManager

from fastapi.concurrency import run_in_threadpool

from db.queries.knowledge_chunks import search_similar_chunks
from graph.state import REQUIRED_SLOTS, AgentState, ExtractedSlots
from llm.provider import LLMProvider

_EXTRACT_SYSTEM_PROMPT = (
    "Extraé del mensaje del usuario los datos de su viaje que estén explícitamente "
    "mencionados: interés turístico, tipo de grupo con el que viaja, duración del "
    "viaje y época del año. Si un dato no está mencionado, dejalo vacío (null) — "
    "no lo inventes ni lo infieras de contexto que no está en el mensaje."
)

_GENERATE_SYSTEM_PROMPT = """Sos Cata, el asistente conversacional de turismo de Visit Catamarca.
Respondé siempre en español rioplatense/argentino (voseo: "vos podés", "tenés") —
nunca como una traducción literal de un prompt en inglés, y sin regionalismos de
otros países hispanohablantes (nada de "tinca", "chévere", "vale", etc.).

Usá ÚNICAMENTE la información que aparece en la sección CONTEXTO. Regla estricta:
si el CONTEXTO está vacío o no tiene nada relevante para la pregunta, respondé
explícitamente que no tenés esa información todavía. Nunca completes la respuesta
con conocimiento general sobre Catamarca o turismo que no venga del CONTEXTO —
ni aunque lo sepas."""

_CLARIFYING_QUESTIONS = {
    "interes": "¿Qué te gustaría hacer en tu viaje? Por ejemplo trekking, gastronomía, historia y cultura, o descanso.",
    "tipo_grupo": "¿Con quién vas a viajar? ¿Solo/a, en pareja, en familia, con amigos?",
}
_DEFAULT_CLARIFYING_QUESTION = "¿Me contás un poco más sobre tu viaje para poder ayudarte mejor?"


def make_extract_profile_node(llm_provider: LLMProvider):
    async def extract_profile_node(state: AgentState) -> dict:
        extracted: ExtractedSlots = await llm_provider.extract_structured(
            system_prompt=_EXTRACT_SYSTEM_PROMPT,
            user_prompt=state["user_message"],
            schema=ExtractedSlots,
        )
        profile = state["visitor_profile"]
        # Primera mención gana: si el slot ya estaba lleno, no se pisa. Es lo que
        # garantiza que una misma sesión no termine con dos VisitorProfile
        # divergentes (ver checklist del subagente `tester`).
        updates = {
            field: getattr(extracted, field)
            for field in type(profile).model_fields
            if getattr(profile, field) is None and getattr(extracted, field) is not None
        }
        merged_profile = profile.model_copy(update=updates) if updates else profile

        missing_slot = next(
            (slot for slot in REQUIRED_SLOTS if getattr(merged_profile, slot) is None), None
        )
        return {"visitor_profile": merged_profile, "missing_slot": missing_slot}

    return extract_profile_node


def ask_clarifying_node(state: AgentState) -> dict:
    """Código plano, sin llamada a IA (regla no negociable #4): el set de
    preguntas posibles es chico y fijo, así que un template es más simple,
    más rápido y más predecible que pedirle a un LLM que redacte la pregunta."""
    question = _CLARIFYING_QUESTIONS.get(state["missing_slot"], _DEFAULT_CLARIFYING_QUESTION)
    return {"response": question}


def make_retrieve_context_node(
    llm_provider: LLMProvider,
    db_session_factory: Callable[[], AbstractContextManager],
):
    async def retrieve_context_node(state: AgentState) -> dict:
        [query_embedding] = await llm_provider.embed([state["user_message"]])

        def _search() -> list[str]:
            # Session de SQLAlchemy es sync — correrla inline acá bloquearía el
            # event loop de FastAPI. run_in_threadpool la saca del loop.
            with db_session_factory() as db:
                return [chunk.content for chunk in search_similar_chunks(db, query_embedding)]

        # Lista vacía si pgvector no tiene chunks todavía (o ninguno es relevante)
        # es un resultado válido, no un error — generate_response_node lo maneja.
        retrieved_chunks = await run_in_threadpool(_search)
        return {"retrieved_chunks": retrieved_chunks}

    return retrieve_context_node


def make_generate_response_node(llm_provider: LLMProvider):
    async def generate_response_node(state: AgentState) -> dict:
        if state["retrieved_chunks"]:
            context = "\n\n---\n\n".join(state["retrieved_chunks"])
        else:
            context = "(sin resultados relevantes en la base de conocimiento)"

        user_prompt = f"CONTEXTO:\n{context}\n\nPREGUNTA DEL USUARIO: {state['user_message']}"
        response = await llm_provider.generate(_GENERATE_SYSTEM_PROMPT, user_prompt)
        return {"response": response}

    return generate_response_node
