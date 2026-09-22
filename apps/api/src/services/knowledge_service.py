from fastapi.concurrency import run_in_threadpool
from sqlalchemy.orm import Session

from db.models import KnowledgeChunk
from db.queries.knowledge_chunks import insert_chunk
from llm.provider import LLMProvider


class KnowledgeService:
    def __init__(self, llm_provider: LLMProvider):
        self._llm_provider = llm_provider

    async def ingest_chunk(self, db: Session, content: str, source: str) -> KnowledgeChunk:
        [embedding] = await self._llm_provider.embed([content])
        # insert_chunk usa una Session sync — sacarla del event loop (ver la
        # misma razón documentada en graph/nodes.py:retrieve_context_node).
        return await run_in_threadpool(insert_chunk, db, content, source, embedding)
