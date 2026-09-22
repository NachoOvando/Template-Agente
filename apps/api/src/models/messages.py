from pydantic import BaseModel, Field


class MessageRequest(BaseModel):
    session_id: str = Field(..., description="Identificador de la conversación, generado por el cliente")
    message: str = Field(..., min_length=1)


class MessageResponse(BaseModel):
    session_id: str
    response: str
