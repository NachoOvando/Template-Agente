"""Doble de test para LLMProvider — nunca pegarle a la API real de Gemini en tests."""

from llm.provider import LLMProvider, T


class FakeLLMProvider(LLMProvider):
    def __init__(self, extract_results=None, generate_result="respuesta fake", embedding_dim=8):
        self._extract_results = list(extract_results or [])
        self._generate_result = generate_result
        self._embedding_dim = embedding_dim
        self.generate_calls: list[tuple[str, str]] = []
        self.extract_calls: list[str] = []
        self.embed_calls: list[list[str]] = []

    async def generate(self, system_prompt: str, user_prompt: str) -> str:
        self.generate_calls.append((system_prompt, user_prompt))
        return self._generate_result

    async def extract_structured(self, system_prompt: str, user_prompt: str, schema: type[T]) -> T:
        self.extract_calls.append(user_prompt)
        if self._extract_results:
            return self._extract_results.pop(0)
        return schema()

    async def embed(self, texts: list[str]) -> list[list[float]]:
        self.embed_calls.append(list(texts))
        return [[0.0] * self._embedding_dim for _ in texts]
