"""Única puerta de entrada al SDK de Gemini. Ver `llm/provider.py`."""

from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings

from config import Settings
from llm.provider import T, LLMProvider


class GeminiProvider(LLMProvider):
    def __init__(self, settings: Settings):
        self._chat = ChatGoogleGenerativeAI(
            model=settings.gemini_model,
            google_api_key=settings.google_api_key,
        )
        self._embeddings = GoogleGenerativeAIEmbeddings(
            model=settings.gemini_embedding_model,
            google_api_key=settings.google_api_key,
        )

    async def generate(self, system_prompt: str, user_prompt: str) -> str:
        response = await self._chat.ainvoke(
            [("system", system_prompt), ("human", user_prompt)]
        )
        return response.content

    async def extract_structured(
        self, system_prompt: str, user_prompt: str, schema: type[T]
    ) -> T:
        structured_chat = self._chat.with_structured_output(schema)
        return await structured_chat.ainvoke(
            [("system", system_prompt), ("human", user_prompt)]
        )

    async def embed(self, texts: list[str]) -> list[list[float]]:
        return await self._embeddings.aembed_documents(texts)
