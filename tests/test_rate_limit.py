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


def test_messages_devuelve_429_despues_del_limite(monkeypatch):
    monkeypatch.setattr("graph.nodes.search_similar_chunks", lambda db, embedding: [])
    llm = FakeLLMProvider(
        extract_results=[ExtractedSlots(interes="trekking", tipo_grupo="familia")]
    )
    service = ConversationService(llm, db_session_factory=_fake_db_session_factory)
    app.dependency_overrides[get_conversation_service] = lambda: service

    client = TestClient(app)
    body = {"session_id": "rate-limit-test", "message": "hola"}

    for _ in range(20):
        response = client.post("/messages", json=body)
        assert response.status_code == 200

    limited = client.post("/messages", json=body)

    app.dependency_overrides.clear()

    assert limited.status_code == 429
