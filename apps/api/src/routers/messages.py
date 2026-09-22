from fastapi import APIRouter, Depends

from dependencies import get_conversation_service
from models.messages import MessageRequest, MessageResponse
from rate_limit import check_rate_limit
from services.conversation_service import ConversationService

router = APIRouter()


@router.post(
    "/messages",
    response_model=MessageResponse,
    dependencies=[Depends(check_rate_limit)],
)
async def post_message(
    body: MessageRequest,
    conversation_service: ConversationService = Depends(get_conversation_service),
) -> MessageResponse:
    response = await conversation_service.handle_message(body.session_id, body.message)
    return MessageResponse(session_id=body.session_id, response=response)
