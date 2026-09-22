from contextlib import contextmanager

from fastapi.testclient import TestClient

from dependencies import get_conversation_service
from graph.state import ExtractedSlots
from main import app
from services.conversation_service import ConversationService
from tests.fakes import FakeLLMProvider


@contextmanager
def _fake_db_session_factory():
    yield None


def test_post_messages_returns_response(monkeypatch):
    monkeypatch.setattr("graph.nodes.search_similar_chunks", lambda db, embedding: [])
    llm = FakeLLMProvider(
        extract_results=[ExtractedSlots(slot_a="trekking", slot_b="familia")]
    )
    service = ConversationService(llm, db_session_factory=_fake_db_session_factory)
    app.dependency_overrides[get_conversation_service] = lambda: service

    client = TestClient(app)
    response = client.post("/messages", json={"session_id": "s1", "message": "hola"})
    app.dependency_overrides.clear()

    assert response.status_code == 200
    assert response.json() == {"session_id": "s1", "response": "respuesta fake"}


def test_post_messages_rechaza_mensaje_vacio():
    client = TestClient(app)
    response = client.post("/messages", json={"session_id": "s1", "message": ""})

    assert response.status_code == 422
