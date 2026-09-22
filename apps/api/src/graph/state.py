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
REQUIRED_SLOTS = ("interes", "tipo_grupo")


class VisitorProfile(BaseModel):
    """Slots del visitante para esta conversación. Una vez que un campo se llena,
    extract_profile_node no lo vuelve a pisar — ver BITACORA.md si hace falta
    cambiar ese comportamiento (permitir corrección)."""

    interes: str | None = Field(
        default=None, description="Interés turístico principal, ej. 'trekking', 'gastronomía', 'historia'"
    )
    tipo_grupo: str | None = Field(
        default=None, description="Con quién viaja, ej. 'familia', 'pareja', 'solo', 'amigos'"
    )
    duracion_viaje: str | None = Field(
        default=None, description="Duración del viaje, ej. 'fin de semana', '5 días'"
    )
    epoca_del_anio: str | None = Field(
        default=None, description="Época del año en la que planea viajar, si la menciona"
    )


class ExtractedSlots(BaseModel):
    """Salida estructurada de un solo mensaje del usuario — todos los campos son
    genuinamente opcionales, a diferencia de VisitorProfile que es el acumulado."""

    interes: str | None = None
    tipo_grupo: str | None = None
    duracion_viaje: str | None = None
    epoca_del_anio: str | None = None


class AgentState(TypedDict):
    session_id: str
    user_message: str
    visitor_profile: VisitorProfile
    missing_slot: str | None
    retrieved_chunks: list[str]
    response: str
