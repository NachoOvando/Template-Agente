"""Orquesta el grafo por sesión. El estado entre turnos vive en memoria de proceso
— alcance explícito de este MVP, no hay tabla de conversaciones en Postgres (no
hace falta: acá no se persiste nada de perfil/analítica todavía, así que la regla
no negociable #3 no aplica sobre datos que ni siquiera se guardan)."""

from graph.build_graph import build_graph
from graph.state import AgentState, VisitorProfile
from db.session import SessionLocal
from llm.provider import LLMProvider


def _new_state(session_id: str, message: str) -> AgentState:
    return AgentState(
        session_id=session_id,
        user_message=message,
        visitor_profile=VisitorProfile(),
        missing_slot=None,
        retrieved_chunks=[],
        response="",
    )


class ConversationService:
    def __init__(self, llm_provider: LLMProvider, db_session_factory=SessionLocal):
        self._graph = build_graph(llm_provider, db_session_factory)
        # Estado por sesión en memoria de proceso — de instancia, no de módulo,
        # para que dos ConversationService (ej. en tests) no compartan sesiones.
        self._sessions: dict[str, AgentState] = {}

    async def handle_message(self, session_id: str, message: str) -> str:
        previous_state = self._sessions.get(session_id)
        state = (
            _new_state(session_id, message)
            if previous_state is None
            else {**previous_state, "user_message": message}
        )

        result_state = await self._graph.ainvoke(state)
        self._sessions[session_id] = result_state
        return result_state["response"]
