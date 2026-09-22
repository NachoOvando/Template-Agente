from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from config import get_settings
from db.session import get_db
from dependencies import get_knowledge_service
from models.knowledge_chunks import KnowledgeChunkRequest, KnowledgeChunkResponse
from services.knowledge_service import KnowledgeService

router = APIRouter()


def verify_internal_api_key(x_internal_api_key: str = Header(...)) -> None:
    settings = get_settings()
    if not settings.internal_api_key or x_internal_api_key != settings.internal_api_key:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="API key inválida")


@router.post(
    "/knowledge-chunks",
    response_model=KnowledgeChunkResponse,
    dependencies=[Depends(verify_internal_api_key)],
)
async def post_knowledge_chunk(
    body: KnowledgeChunkRequest,
    db: Session = Depends(get_db),
    knowledge_service: KnowledgeService = Depends(get_knowledge_service),
) -> KnowledgeChunkResponse:
    chunk = await knowledge_service.ingest_chunk(db, content=body.content, source=body.source)
    return KnowledgeChunkResponse(id=str(chunk.id), content=chunk.content, source=chunk.source)
