# Progreso — Cata (agente de ejemplo)

## Estado actual
Fase 1 (MVP) + Fase 2 (página de prueba React + beUI) + widget embebible
implementadas, auditadas y validadas end-to-end con Gemini real. Ponytail y
los 3 subagentes ya cargan nativos. Próximo paso: arrancar el resto de la
Fase 3 del roadmap cuando se defina (n8n, Jev, Observatorio).

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
  - Sesión reiniciada: Ponytail y los 3 subagentes (`.claude/agents/`) ya
    cargan nativos.
  - Conseguida una `GOOGLE_API_KEY` real. Seed corrido contra Gemini real
    (13 chunks). `/messages` probado end-to-end (curl) con 3 escenarios:
    slot faltante → pregunta; slot completo → respuesta grounded en los
    chunks reales; pregunta fuera de base → "no tengo esa información".
    Encontrados y corregidos 3 problemas que `FakeLLMProvider` no podía
    detectar (ver BITACORA.md, "Primera corrida contra Gemini real"):
    `.content` devolvía content blocks en vez de `str` (fix: `.text`),
    `models/text-embedding-004` no existe para esta key (fix:
    `models/gemini-embedding-001` + `output_dimensionality` explícito), y
    el prompt de generación no especificaba variante de español (Gemini
    respondió con un chilenismo — fix: español rioplatense explícito en
    el prompt).
  - Fase 2 migrada a React + Vite + Tailwind CSS 4, con componentes de
    beUI (https://beui.dev) instalados vía shadcn — decisión explícita del
    usuario, reemplaza el HTML/JS estático original. `apps/web/` ahora es
    un proyecto con build step (`npm install && npm run dev`). Componentes
    usados: `message` (filas/burbujas/scroller de conversación), `input`,
    `button-stateful` (estado idle→loading→success/error en el envío),
    `animated-toast-stack` (errores de conexión). CLAUDE.md actualizado
    para reflejar el cambio de stack del frontend. Encontrado y corregido
    un bug real: la burbuja de beUI no parseaba markdown, Gemini generaba
    `**negrita**` que se veía como texto plano con asteriscos — agregado
    `react-markdown` (ver BITACORA.md). Probado end-to-end con Playwright
    headless (typecheck limpio, build de producción limpio, sin errores de
    consola, conversación completa funcionando con Gemini real).
  - Widget embebible adelantado a pedido explícito del usuario (estaba
    fuera de alcance del kickoff original). `Chat.tsx` extraído de `App.tsx`
    para reusar la lógica de conversación entre la página de prueba y
    `ChatWidget.tsx` (burbuja flotante + panel). `widget-entry.tsx` +
    `vite.widget.config.ts` compilan un IIFE autocontenido
    (`dist-widget/widget.js`, `npm run build:widget`) que se monta en un
    Shadow DOM — aislamiento total de CSS respecto al sitio host. Backend:
    CORS restringido por `CORS_ALLOWED_ORIGINS` (ya no `"*"`) y rate
    limiting in-memory por IP en `POST /messages` (`rate_limit.py`, 20
    msj/min) porque ahora es un endpoint público sin API key.
    Encontrados y corregidos 2 bugs reales de este mecanismo (ver
    BITACORA.md): `process is not defined` en el bundle IIFE (falta
    `define` de `process.env.NODE_ENV`, además bajó el bundle de 1.1MB a
    ~700KB), y el panel se renderizaba transparente (`:root` no matchea
    dentro de un shadow tree, hay que reescribirlo a `:host`). Validado
    con Playwright embebiendo el widget en una página HTML de terceros
    simulada con CSS deliberadamente hostil (`* { border-radius: 0
    !important }`, etc.) — ni el widget rompió el sitio host, ni el sitio
    host rompió el widget.
- Falta:
  - Nitpicks de backend-senior no resueltos a propósito (no ameritan acción en
    este MVP): `requirements.txt` sin pins exactos, sin exception handler
    global con logging del lado servidor, sin índice en `knowledge_chunks.source`.
  - Rate limiting es in-memory por proceso (`# ponytail:` marcado en
    `rate_limit.py`) — no sirve si se corre con más de un worker/instancia.
    Pasar a un backend compartido (Redis) si se escala.
  - Definir alcance del resto de la Fase 3 (fuera de este kickoff: ingesta
    vía n8n, piloto de Jev, Observatorio).
- Bloqueadores: ninguno.
