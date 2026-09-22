from pydantic import BaseModel, Field


class KnowledgeChunkRequest(BaseModel):
    content: str = Field(..., min_length=1)
    source: str = Field(..., min_length=1)


class KnowledgeChunkResponse(BaseModel):
    id: str
    content: str
    source: str
