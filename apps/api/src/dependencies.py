"""Wiring de dependencias para FastAPI (`Depends()`).

Este es el único lugar, junto con `llm/gemini_provider.py`, que conoce la
implementación concreta del proveedor de LLM. Los routers y services solo
ven `LLMProvider` (la interfaz).
"""

from functools import lru_cache

from config import Settings, get_settings
from llm.gemini_provider import GeminiProvider
from llm.provider import LLMProvider
from services.conversation_service import ConversationService
from services.knowledge_service import KnowledgeService


@lru_cache
def get_llm_provider() -> LLMProvider:
    settings: Settings = get_settings()
    return GeminiProvider(settings)


@lru_cache
def get_conversation_service() -> ConversationService:
    return ConversationService(get_llm_provider())


@lru_cache
def get_knowledge_service() -> KnowledgeService:
    return KnowledgeService(get_llm_provider())
