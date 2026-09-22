from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import health, knowledge_chunks, messages

app = FastAPI(title="Cata — agente de ejemplo (Visit Catamarca)", version="0.1.0")

# CORS abierto: apps/web es un arnés de prueba estático servido desde otro
# origen/puerto, no una API de producción con clientes a restringir.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(messages.router)
app.include_router(knowledge_chunks.router)
