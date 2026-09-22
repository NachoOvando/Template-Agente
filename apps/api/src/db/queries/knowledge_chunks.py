from sqlalchemy.orm import Session

from db.models import KnowledgeChunk

# Umbral de distancia coseno de pgvector (0 = idéntico, 2 = opuesto). Chunks más
# lejanos que esto se consideran no relevantes — mejor no traer contexto que traer
# contexto que no tiene que ver (regla no negociable #2, anti-alucinación).
_MAX_RELEVANT_DISTANCE = 0.5


def insert_chunk(db: Session, content: str, source: str, embedding: list[float]) -> KnowledgeChunk:
    chunk = KnowledgeChunk(content=content, source=source, embedding=embedding)
    db.add(chunk)
    db.commit()
    db.refresh(chunk)
    return chunk


def search_similar_chunks(
    db: Session, query_embedding: list[float], limit: int = 3
) -> list[KnowledgeChunk]:
    distance = KnowledgeChunk.embedding.cosine_distance(query_embedding)
    return (
        db.query(KnowledgeChunk)
        .filter(distance < _MAX_RELEVANT_DISTANCE)
        .order_by(distance)
        .limit(limit)
        .all()
    )
