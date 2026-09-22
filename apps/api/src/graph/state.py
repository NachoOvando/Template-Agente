"""Estado compartido del grafo. Ver `graph/build_graph.py` para el flujo completo."""

from typing import TypedDict

from pydantic import BaseModel, Field

# El historial de mensajes vive en el frontend de prueba (Fase 2), no en el
# estado del grafo — ningún nodo necesita turnos anteriores para decidir nada
# en este MVP. Si un nodo futuro necesita historial, agregarlo acá.

# Slots obligatorios: si falta alguno, se rutea a ask_clarifying_node en vez de
# retrieve_context_node. Código plano (regla no negociable #4) — sin esto en una
# lista, tendríamos que preguntarle a un LLM si "falta algo", que es más caro,
# más lento y menos predecible que comparar contra None.
REQUIRED_SLOTS = ("slot_a", "slot_b")


class UserProfile(BaseModel):
    """Placeholders — redefinir para tu dominio. Una vez que un campo se llena,
    extract_profile_node no lo vuelve a pisar — ver BITACORA.md si hace falta
    cambiar ese comportamiento (permitir corrección)."""

    slot_a: str | None = Field(
        default=None, description="Placeholder — slot obligatorio A. Redefinir para tu dominio."
    )
    slot_b: str | None = Field(
        default=None, description="Placeholder — slot obligatorio B. Redefinir para tu dominio."
    )
    slot_c: str | None = Field(
        default=None, description="Placeholder — slot opcional C. Redefinir para tu dominio."
    )
    slot_d: str | None = Field(
        default=None, description="Placeholder — slot opcional D. Redefinir para tu dominio."
    )


class ExtractedSlots(BaseModel):
    """Salida estructurada de un solo mensaje del usuario — todos los campos son
    genuinamente opcionales, a diferencia de UserProfile que es el acumulado."""

    slot_a: str | None = None
    slot_b: str | None = None
    slot_c: str | None = None
    slot_d: str | None = None


class AgentState(TypedDict):
    session_id: str
    user_message: str
    user_profile: UserProfile
    missing_slot: str | None
    retrieved_chunks: list[str]
    response: str
