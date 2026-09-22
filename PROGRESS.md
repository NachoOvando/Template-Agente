# Progreso — Cata (agente de ejemplo)

## Estado actual
Fase 1 (MVP) + Fase 2 (página de prueba) implementadas y auditadas. Pendiente:
probar con una GOOGLE_API_KEY real.

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
  - `alembic upgrade head` corrido contra Postgres real (Docker Compose).
  - Auditoría de Fase 1 con los 3 subagentes (corridos como agentes generales,
    ver bloqueador abajo): `agent-behavior-reviewer` sin hallazgos bloqueantes;
    `backend-senior` encontró 2 hallazgos de severidad media (índice pgvector —
    se deja para cuando haya volumen real, no antes; llamadas sync a
    SQLAlchemy bloqueando el event loop — corregido con `run_in_threadpool`) y
    nitpicks menores (comparación de API key no constant-time — corregido con
    `secrets.compare_digest`); `tester` encontró un bug real de concurrencia
    (ver BITACORA.md, "Race condition: mensajes concurrentes...") — corregido
    con lock por sesión + test de regresión.
  - 12 tests pytest pasando (guardrail anti-alucinación, dato faltante,
    base vacía, consistencia de `VisitorProfile` por sesión incluyendo
    concurrencia, endpoints).
- Falta:
  - Correr el seed real y probar `/messages` end-to-end con una `GOOGLE_API_KEY`
    real (no disponible en este entorno).
  - Reiniciar la sesión de Claude Code para que Ponytail y los 3 subagentes
    (`.claude/agents/`) queden disponibles nativamente — se instalaron/crearon
    a mitad de sesión, por eso esta auditoría se corrió con agentes generales.
  - Nitpicks de backend-senior no resueltos a propósito (no ameritan acción en
    este MVP): `requirements.txt` sin pins exactos, sin exception handler
    global con logging del lado servidor, sin índice en `knowledge_chunks.source`.
- Bloqueadores:
  - Sin `GOOGLE_API_KEY` real en este entorno — no se pudo validar el
    comportamiento real del agente contra Gemini, solo con `FakeLLMProvider`.
