"""Ruteo condicional del grafo — código plano, sin llamada a IA (regla no
negociable #4). `extract_profile_node` ya calculó `missing_slot`; acá solo se
lee ese valor para decidir la rama."""

from graph.state import AgentState


def route_after_extraction(state: AgentState) -> str:
    return "ask_clarifying" if state["missing_slot"] else "retrieve_context"
