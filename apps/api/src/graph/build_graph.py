"""Construcción del grafo explícito de Cata.

    START → extract_profile → (condicional) → ask_clarifying → END
                                             → retrieve_context → generate_response → END

Cada nodo tiene una responsabilidad puntual (ver tabla en CLAUDE.md). Si se
agrega un nodo nuevo, documentarlo ahí también.
"""

from collections.abc import Callable
from contextlib import AbstractContextManager

from langgraph.graph import END, START, StateGraph

from graph.nodes import (
    ask_clarifying_node,
    make_extract_profile_node,
    make_generate_response_node,
    make_retrieve_context_node,
)
from graph.routing import route_after_extraction
from graph.state import AgentState
from llm.provider import LLMProvider


def build_graph(
    llm_provider: LLMProvider,
    db_session_factory: Callable[[], AbstractContextManager],
):
    graph = StateGraph(AgentState)

    graph.add_node("extract_profile", make_extract_profile_node(llm_provider))
    graph.add_node("ask_clarifying", ask_clarifying_node)
    graph.add_node(
        "retrieve_context", make_retrieve_context_node(llm_provider, db_session_factory)
    )
    graph.add_node("generate_response", make_generate_response_node(llm_provider))

    graph.add_edge(START, "extract_profile")
    graph.add_conditional_edges(
        "extract_profile",
        route_after_extraction,
        {"ask_clarifying": "ask_clarifying", "retrieve_context": "retrieve_context"},
    )
    graph.add_edge("ask_clarifying", END)
    graph.add_edge("retrieve_context", "generate_response")
    graph.add_edge("generate_response", END)

    return graph.compile()
