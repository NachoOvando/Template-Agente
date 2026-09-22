# Progreso — Cata (agente de ejemplo)

## Estado actual
Fase 1 (MVP) + Fase 2 (página de prueba) implementadas. Pendiente: revisar
hallazgos de la auditoría de subagentes y probar con una GOOGLE_API_KEY real.

## Historial

### 2026-09-22
- Hecho:
  - Fase 0: CLAUDE.md, PROGRESS.md, BITACORA.md, subagentes (`backend-senior`,
    `tester`, `agent-behavior-reviewer`), plugin Ponytail instalado (scope user).
  - Fase 1: FastAPI + LangGraph. Grafo explícito (`extract_profile` →
    condicional → `ask_clarifying` | `retrieve_context` → `generate_response`).
    `LLMProvider`/`GeminiProvider` (Gemini vía langchain-google-genai). Modelos
    SQLAlchemy + Alembic (migración por autogenerate) + pgvector. Tabla
    `knowledge_chunks` sembrada con 13 chunks dummy de Catamarca (seed script,
    no ejecutado contra Gemini real todavía — falta API key). Endpoints
    `POST /messages`, `GET /health`, `POST /knowledge-chunks` (protegido por
    API key interna).
  - Fase 2: página de prueba estática (`apps/web/`, sin build step).
  - 11 tests pytest pasando (guardrail anti-alucinación, dato faltante,
    base vacía, consistencia de `VisitorProfile` por sesión, endpoints).
  - `alembic upgrade head` corrido contra Postgres real (Docker Compose).
- Falta:
  - Correr el seed real y probar `/messages` end-to-end con una `GOOGLE_API_KEY`
    real (no disponible en este entorno).
  - Reiniciar la sesión de Claude Code para que Ponytail y los 3 subagentes
    (`.claude/agents/`) queden disponibles nativamente — se instalaron/crearon
    a mitad de sesión.
  - Revisar y resolver los hallazgos de la auditoría de backend-senior, tester
    y agent-behavior-reviewer (corridos como agentes generales por la
    limitación de arriba).
- Bloqueadores:
  - Sin `GOOGLE_API_KEY` real en este entorno — no se pudo validar el
    comportamiento real del agente contra Gemini, solo con `FakeLLMProvider`.
