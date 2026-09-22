"""Abstracción única de modelo de lenguaje (regla no negociable #1 del CLAUDE.md).

Ningún nodo del grafo ni servicio debe importar un SDK de proveedor (Gemini u otro)
directamente. Todo pasa por esta interfaz — cambiar de proveedor es implementar
`LLMProvider` de nuevo, sin tocar `graph/`.
"""

from abc import ABC, abstractmethod
from typing import TypeVar

from pydantic import BaseModel

T = TypeVar("T", bound=BaseModel)


class LLMProvider(ABC):
    @abstractmethod
    async def generate(self, system_prompt: str, user_prompt: str) -> str:
        """Genera una respuesta de texto libre."""

    @abstractmethod
    async def extract_structured(
        self, system_prompt: str, user_prompt: str, schema: type[T]
    ) -> T:
        """Extrae datos estructurados de `user_prompt` según `schema`."""

    @abstractmethod
    async def embed(self, texts: list[str]) -> list[list[float]]:
        """Genera embeddings para una lista de textos."""
