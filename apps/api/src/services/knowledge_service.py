from sqlalchemy.orm import Session

from db.models import KnowledgeChunk
from db.queries.knowledge_chunks import insert_chunk
from llm.provider import LLMProvider


class KnowledgeService:
    def __init__(self, llm_provider: LLMProvider):
        self._llm_provider = llm_provider

    async def ingest_chunk(self, db: Session, content: str, source: str) -> KnowledgeChunk:
        [embedding] = await self._llm_provider.embed([content])
        return insert_chunk(db, content=content, source=source, embedding=embedding)
