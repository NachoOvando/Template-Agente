from fastapi.testclient import TestClient

from config import get_settings
from dependencies import get_knowledge_service
from db.session import get_db
from main import app


class _FakeChunk:
    def __init__(self, content: str, source: str):
        self.id = "00000000-0000-0000-0000-000000000000"
        self.content = content
        self.source = source


class _FakeKnowledgeService:
    async def ingest_chunk(self, db, content: str, source: str) -> _FakeChunk:
        return _FakeChunk(content, source)


def test_post_knowledge_chunks_sin_header_devuelve_422(monkeypatch):
    monkeypatch.setenv("INTERNAL_API_KEY", "secreto-de-test")
    get_settings.cache_clear()

    client = TestClient(app)
    response = client.post("/knowledge-chunks", json={"content": "x", "source": "y"})

    get_settings.cache_clear()
    assert response.status_code == 422


def test_post_knowledge_chunks_con_api_key_invalida_devuelve_401(monkeypatch):
    monkeypatch.setenv("INTERNAL_API_KEY", "secreto-de-test")
    get_settings.cache_clear()

    client = TestClient(app)
    response = client.post(
        "/knowledge-chunks",
        json={"content": "x", "source": "y"},
        headers={"x-internal-api-key": "incorrecta"},
    )

    get_settings.cache_clear()
    assert response.status_code == 401


def test_post_knowledge_chunks_con_api_key_valida_ingresa(monkeypatch):
    monkeypatch.setenv("INTERNAL_API_KEY", "secreto-de-test")
    get_settings.cache_clear()
    app.dependency_overrides[get_knowledge_service] = lambda: _FakeKnowledgeService()
    app.dependency_overrides[get_db] = lambda: None

    client = TestClient(app)
    response = client.post(
        "/knowledge-chunks",
        json={"content": "contenido de prueba", "source": "test"},
        headers={"x-internal-api-key": "secreto-de-test"},
    )

    app.dependency_overrides.clear()
    get_settings.cache_clear()

    assert response.status_code == 200
    body = response.json()
    assert body["content"] == "contenido de prueba"
    assert body["source"] == "test"
