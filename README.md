# Template de agente conversacional (FastAPI + LangGraph)

Template genérico de agente conversacional con RAG: **FastAPI + LangGraph +
Gemini + pgvector**, sin persona ni dominio propios. Se forkea y se le define
una identidad distinta en cada uso (turismo, asistente general, atención al
cliente, etc.).

- **Es**: base arquitectónicamente correcta, lista para forkear.
- **No es**: un agente terminado para ningún dominio específico. Los prompts,
  slots y contenido RAG de este HEAD son placeholders de ejemplo.

> Convenciones de diseño, reglas no negociables y memoria de ingeniería
> (bugs encontrados, causa raíz, regla extraída) viven en
> [`CLAUDE.md`](./CLAUDE.md) y [`BITACORA.md`](./BITACORA.md). Este README es
> la puerta de entrada humana — para el detalle de "por qué está armado así"
> y el checklist de forkeo, esos dos archivos mandan.

## Stack

| Capa | Tecnología |
|---|---|
| Backend | FastAPI + LangGraph (grafo explícito, no tool-calling libre) |
| Modelo | Google Gemini (`gemini-3.5-flash-lite`) vía `langchain-google-genai`, detrás de una interfaz `LLMProvider` reemplazable |
| DB | PostgreSQL + pgvector, SQLAlchemy, Alembic (migraciones solo por autogenerate) |
| Frontend de prueba | React + Vite + Tailwind CSS 4, componentes de [beUI](https://beui.dev) vía shadcn |
| Widget embebible | Bundle IIFE + Shadow DOM, para insertar el chat en cualquier sitio de terceros |
| Entorno local | Docker Compose (`pgvector/pgvector:pg16`) |

## Cómo se arma una respuesta — el grafo

```
START → extract_profile → (¿falta un slot obligatorio?)
                             ├─ sí → ask_clarifying ──────────────┐
                             └─ no → retrieve_context             │
                                        → generate_response ──────┼→ END
```

| Nodo | Responsabilidad | Llama a IA |
|---|---|---|
| `extract_profile` | Extrae slots (`slot_a`, `slot_b`, `slot_c`, `slot_d` — placeholders) del mensaje. Primera mención gana. Calcula `missing_slot`. | Sí (extracción estructurada) |
| `route_after_extraction` | Decide la rama según `missing_slot`. Código plano. | No |
| `ask_clarifying` | Pregunta por el slot obligatorio faltante, template fijo. | No |
| `retrieve_context` | Embedding del mensaje + búsqueda por similitud en `knowledge_chunks` (pgvector). Lista vacía es válido, no error. | Solo embeddings |
| `generate_response` | Única fuente de texto libre. Guardrail anti-alucinación: sin contexto relevante, lo dice explícitamente — nunca completa con conocimiento general. | Sí (generación) |

Detalle completo de cada nodo en `apps/api/src/graph/nodes.py` y en la tabla
de `CLAUDE.md`.

## Estructura del repo

```
apps/api/src/
  graph/            state.py (AgentState, UserProfile, ExtractedSlots),
                    nodes.py, routing.py, build_graph.py
  llm/              provider.py (interfaz LLMProvider) + gemini_provider.py
  db/               models.py, session.py, queries/knowledge_chunks.py
  services/         conversation_service.py, knowledge_service.py
  routers/          health.py, messages.py, knowledge_chunks.py
  models/           schemas Pydantic de request/response
  seed/             seed_knowledge_chunks.py (contenido dummy placeholder)
  config.py, main.py, dependencies.py, rate_limit.py

apps/web/           frontend de prueba (React) + widget embebible
  src/App.tsx           página de prueba end-to-end
  src/components/Chat.tsx    lógica de conversación (compartida)
  src/components/ChatWidget.tsx  burbuja flotante + panel embebible
  src/widget-entry.tsx   mount point del widget (Shadow DOM)
  vite.widget.config.ts  build IIFE separado → dist-widget/widget.js

alembic/            migraciones (solo autogenerate)
db-init/             provisioning de extensiones de Postgres (pgvector)
tests/               pytest, con FakeLLMProvider (nunca pega a Gemini/DB reales)
.github/workflows/   build + push de la imagen del backend a GHCR
```

## Correr en local

### Backend

```bash
cp .env.example .env   # completar GOOGLE_API_KEY, INTERNAL_API_KEY
docker compose up -d db
pip install -r requirements.txt -r requirements-dev.txt
alembic upgrade head
uvicorn main:app --reload --app-dir apps/api/src
```

`GET /health` para confirmar que levantó. `POST /messages` (body:
`{"session_id": "...", "message": "..."}`) para hablar con el agente —
necesita chunks sembrados primero:

```bash
python -m seed.seed_knowledge_chunks   # desde apps/api/src, con PYTHONPATH configurado
```

`POST /knowledge-chunks` (protegido por header `X-Internal-Api-Key`) para
ingestar contenido nuevo sin pasar por el seed script.

### Frontend de prueba

```bash
cd apps/web
cp .env.example .env   # VITE_API_BASE_URL, default http://localhost:8000
npm install
npm run dev
```

### Widget embebible

```bash
cd apps/web && npm run build:widget   # dist-widget/widget.js
```

Un sitio de terceros lo carga con:

```html
<script src="https://tu-dominio/widget.js" data-api-base="https://tu-api"></script>
```

Se monta en un Shadow DOM (aislamiento total de CSS respecto al sitio host).
Backend: `CORS_ALLOWED_ORIGINS` tiene que incluir cada dominio que lo aloje
(nunca `"*"`); `POST /messages` tiene rate limiting in-memory por IP (20
mensajes/minuto) porque es un endpoint público sin autenticación. Detalle en
la sección "Widget embebible" de `CLAUDE.md`.

## Tests

```bash
export DATABASE_URL="postgresql+psycopg://app:app@localhost:5432/app" GOOGLE_API_KEY="dummy"
python -m pytest
```

Todos los tests corren contra `FakeLLMProvider` (`tests/fakes.py`) — nunca
pegan a Gemini ni a Postgres reales.

## Cómo forkear este template

1. **Persona y tono** — `apps/api/src/graph/nodes.py`, `_GENERATE_SYSTEM_PROMPT`: reemplazar `[TU PROYECTO]`/`[TU DOMINIO]`.
2. **Schema de slots** — `apps/api/src/graph/state.py` + `_CLARIFYING_QUESTIONS` en `nodes.py`: renombrar `slot_a/b/c/d` a los campos reales. No hace falta tocar `extract_profile_node` ni `_build_retrieval_query`, ya iteran el schema genéricamente.
3. **Contenido RAG** — `apps/api/src/seed/seed_knowledge_chunks.py`: reemplazar los chunks placeholder.
4. **Branding del frontend** — `App.tsx`, `ChatWidget.tsx`, `Chat.tsx`, `widget-entry.tsx`, `vite.widget.config.ts`, `index.html`, `apps/web/README.md`.
5. **Naming de infra** — `"app"` como user/pass/db de Postgres en `config.py` + `.env.example` + `docker-compose.yml` (los 3 juntos), y el tag de imagen en `.github/workflows/build-backend-image.yml`.
6. **Memoria del proyecto** — resetear `PROGRESS.md`, seguir (o reiniciar) `BITACORA.md`.

Checklist completo, con el razonamiento detrás de cada paso, en la sección
["Cómo forkear este template"](./CLAUDE.md#cómo-forkear-este-template) de
`CLAUDE.md`.

## Reglas no negociables

1. **Abstracción única de modelo** — ninguna llamada al SDK de Gemini fuera de `LLMProvider`.
2. **Anti-alucinación** — sin contexto relevante, el agente lo dice explícitamente, nunca completa con conocimiento general.
3. **Cero PII** en tablas de perfil/analítica.
4. **Grafo explícito y auditable** — cada nodo con una responsabilidad única, ruteo en código plano donde se pueda.

Detalle y justificación de cada regla en `CLAUDE.md`.
