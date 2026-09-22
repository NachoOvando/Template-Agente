from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import get_settings
from routers import health, knowledge_chunks, messages

app = FastAPI(title="Cata — agente de ejemplo (Visit Catamarca)", version="0.1.0")

# Orígenes explícitos por env var (CORS_ALLOWED_ORIGINS), nunca "*" — el
# widget embebible expone /messages a cualquier página que lo cargue, así
# que solo los orígenes que efectivamente lo alojan deberían poder pegarle.
app.add_middleware(
    CORSMiddleware,
    allow_origins=get_settings().cors_allowed_origins_list,
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type", "X-Internal-Api-Key"],
)

app.include_router(health.router)
app.include_router(messages.router)
app.include_router(knowledge_chunks.router)
