# CLAUDE.md — Template de agente conversacional (FastAPI + LangGraph)

Este archivo es específico de este repo. No repite lo que ya cubren los skills globales
(`project-structure`, `api-conventions`, `db-conventions`, `testing-patterns`) — para
estructura de carpetas, convenciones de API y de esquema, esos skills mandan.

## Qué es esto y qué no es

Este repo es un **template genérico** de agente conversacional con RAG: FastAPI +
LangGraph + Gemini + pgvector, sin persona ni dominio propios. Se forkea y se le
define una persona/dominio distinto en cada uso (turismo, asistente general,
atención al cliente, etc.) — ver "Cómo forkear este template" más abajo.

- **Es**: base arquitectónicamente correcta, lista para forkear.
- **No es**: un agente terminado para ningún dominio específico. Los prompts,
  slots y contenido RAG de este HEAD son placeholders de ejemplo.
- El widget embebible (`apps/web/dist-widget/widget.js`) se adelantó a pedido
  explícito del usuario original — ver sección "Widget embebible" más abajo.

## Cómo forkear este template

Al forkear, tocar en este orden:

1. **Persona y tono** (`apps/api/src/graph/nodes.py`, `_GENERATE_SYSTEM_PROMPT`):
   reemplazar `[TU PROYECTO]` y `[TU DOMINIO]` por la identidad y el dominio
   reales. El guardrail anti-alucinación (regla no negociable #2) y el resto
   de la estructura del prompt no se tocan. El voseo/español rioplatense es
   convención de este template, no un requisito — cambiarlo si el proyecto
   necesita otro tono.
2. **Schema de slots** (`apps/api/src/graph/state.py` + `_CLARIFYING_QUESTIONS`
   en `nodes.py`): renombrar `slot_a/slot_b/slot_c/slot_d` a los campos reales
   del dominio, ajustar `REQUIRED_SLOTS` y escribir las preguntas de
   clarificación. **No hace falta tocar** `extract_profile_node` ni
   `_build_retrieval_query` — ambos iteran `model_fields` genéricamente, así
   que ya funcionan con cualquier schema de `UserProfile`/`ExtractedSlots`.
3. **Contenido RAG** (`apps/api/src/seed/seed_knowledge_chunks.py`): reemplazar
   los chunks placeholder por contenido real del dominio, y `_SOURCE` por un
   identificador propio.
4. **Branding del frontend**: `apps/web/src/App.tsx`, `ChatWidget.tsx`,
   `Chat.tsx` (label de "pensando"), `widget-entry.tsx` (identificadores
   cosméticos), `vite.widget.config.ts` (`name` del IIFE), `index.html`
   (`<title>`), `README.md`.
5. **Naming de infra**: `"app"` como user/pass/db de Postgres y nombre de
   volumen en `apps/api/src/config.py`, `.env.example` y `docker-compose.yml`
   (los 3 juntos); el tag de imagen en
   `.github/workflows/build-backend-image.yml`.
6. **Memoria del proyecto**: resetear `PROGRESS.md` y empezar `BITACORA.md`
   fresco (o seguir agregando entradas ahí si las lecciones de ingeniería de
   este template siguen aplicando al fork).

## Stack y por qué

- **Backend**: FastAPI + LangGraph. El grafo es explícito (`StateGraph` con edges
  condicionales), no un agente de tool-calling libre — cada paso de la conversación
  tiene que poder auditarse leyendo el grafo, no inferirse de logs.
- **Modelo**: Google Gemini (`gemini-3.5-flash-lite`) vía `langchain-google-genai`,
  para generación y extracción estructurada — default de ejemplo, reemplazable
  sin tocar los nodos del grafo porque vive detrás de `LLMProvider` (regla
  no negociable #1).
- **DB**: PostgreSQL + pgvector, SQLAlchemy, Alembic. Migraciones solo por
  autogenerate — nunca SQL a mano.
- **Entorno local**: Docker Compose, imagen `pgvector/pgvector:pg16`.
- **Producción**: [InsForge](https://insforge.dev) es el hosting de ejemplo
  para este stack (Compute para el contenedor, su Postgres gestionado como
  DB, usado **solo como hosting** — nunca su SDK/PostgREST propio). Sin
  deploy vigente en esta instancia del template — ver "Producción" en
  `PROGRESS.md`.
- **Frontend de prueba**: React + Vite + Tailwind CSS 4, componentes de
  [beUI](https://beui.dev) (`message`, `input`, `button-stateful`,
  `animated-toast-stack`) instalados vía shadcn — default de ejemplo para
  definir el UI/UX del chat. Sigue siendo un arnés de prueba end-to-end, no
  un producto: sin sidebar, sin navegación, sin persistencia de conversación
  más allá de la sesión del navegador. Ver `apps/web/README.md`.

## Widget embebible

`apps/web/src/widget-entry.tsx` + `vite.widget.config.ts` compilan un bundle
IIFE autocontenido (`npm run build:widget` → `dist-widget/widget.js`) que
cualquier sitio de terceros carga con:

```html
<script src="https://tu-dominio/widget.js" data-api-base="https://tu-api"></script>
```

- Se monta en un Shadow DOM (`host.attachShadow`) — el CSS del sitio host no
  le pisa estilos al widget, y viceversa. El CSS inyectado reescribe
  `:root` → `:host` (ver BITACORA.md, `:root` no matchea dentro de un shadow
  tree).
- `Chat.tsx` es el componente compartido entre la página de prueba
  (`App.tsx`) y el widget (`ChatWidget.tsx`) — la lógica de conversación no
  está duplicada.
- La URL del backend se configura en runtime vía `data-api-base` (no en
  build time como en la página de prueba), porque el mismo bundle se
  distribuye a cualquier sitio host — ver `lib/api.ts::setApiBaseUrl`.
- Backend: `CORS_ALLOWED_ORIGINS` tiene que incluir cada dominio que aloje
  el widget (nunca `"*"` — ver `config.py`). `POST /messages` tiene rate
  limiting in-memory por IP (`rate_limit.py`, 20 mensajes/minuto) porque es
  un endpoint público sin autenticación que cuesta una llamada real a
  Gemini por mensaje.

## Reglas no negociables

1. **Abstracción única de modelo.** Ninguna llamada al SDK de Gemini fuera de una
   interfaz `LLMProvider`. Mañana puede sumarse otro proveedor sin tocar los nodos
   del grafo.
2. **Anti-alucinación.** Si el nodo de recuperación no trae contexto relevante, el
   agente responde explícitamente que no tiene esa información. Nunca completar con
   conocimiento general del modelo.
3. **Cero PII en tablas de perfil/analítica.** Si se guarda algo sobre el usuario, es
   anonimizado por diseño, no por filtro posterior.
4. **Grafo explícito y auditable.** Cada nodo tiene una responsabilidad única. Las
   decisiones de ruteo son código plano donde se pueda — no todo tiene que ser una
   llamada a IA.

Estas reglas no son sugerencias ni están sujetas a "simplificar" por Ponytail: son
requisitos de diseño, no falta de simplicidad.

## Antes de tocar `graph/` o un system prompt

Leer `BITACORA.md` buscando entradas relacionadas por palabra clave, antes de escribir
código. Si el problema que estás por resolver ya se resolvió (o se intentó y falló) una
vez, está documentado ahí.

## Memoria del proyecto

- `PROGRESS.md`: estado actual, se actualiza al cerrar una sesión de trabajo (no en
  cada commit).
- `BITACORA.md`: histórico de problemas resueltos — causa raíz y regla extraída, no
  solo el fix.

## Ponytail

Activo en modo `full` (no `ultra`: `ultra` cuestiona requisitos agresivamente, y las
reglas no negociables de arriba no son negociables por diseño, no por falta de
simplicidad).

- `/ponytail-review` antes de cerrar cualquier feature — diff, no repo entero.
- `/ponytail-audit` de vez en cuando sobre todo el repo.
- `/ponytail-debt` para atajos marcados en código con comentarios `ponytail:` —
  deuda técnica puntual, no reemplaza `BITACORA.md`.

División de responsabilidad para que no se pisen:
- **Ponytail**: sobre-ingeniería y código de más, a nivel de diff.
- **`BITACORA.md`**: memoria narrativa de decisiones y problemas — no de bloat.
- **`agent-behavior-reviewer`**: comportamiento del agente conversacional, no volumen
  de código.

## Grafo — nodos

```
START → extract_profile → (condicional) → ask_clarifying → END
                                         → retrieve_context → generate_response → END
```

| Nodo | Responsabilidad | Llama a IA |
|---|---|---|
| `extract_profile` | Extrae slots (`slot_a`, `slot_b`, `slot_c`, `slot_d` — placeholders, redefinir para tu dominio) del mensaje vía `LLMProvider.extract_structured()`. Primera mención gana — no pisa un slot ya lleno. Calcula `missing_slot`. | Sí (extracción estructurada, no generación libre) |
| `route_after_extraction` (edge condicional) | Lee `missing_slot` y decide la rama. Código plano. | No |
| `ask_clarifying` | Pregunta por el slot obligatorio faltante, con templates fijos por slot. | No |
| `retrieve_context` | Embedding del mensaje + búsqueda por similitud en `knowledge_chunks` (pgvector). Lista vacía es un resultado válido, no un error. | Solo embeddings, no generación |
| `generate_response` | Única fuente de texto libre para el usuario cuando hay contexto recuperado. Guardrail anti-alucinación (regla no negociable #2) explícito en el prompt: si no hay contexto relevante, lo dice, nunca completa con conocimiento general. | Sí (generación) |

`extract_profile` está aislada a propósito para poder migrarse o reemplazarse
sola en el futuro (ej. por un servicio de extracción externo) — no tiene
lógica de generación mezclada, solo extracción + merge de slots (código plano).

## Subagentes

| Subagente | Cuándo se invoca |
|---|---|
| `backend-senior` | Después de cualquier cambio estructural en el backend. Al cerrar una feature de backend, nunca durante la escritura inicial del código. |
| `tester` | Después de cada feature nueva o cambio en el grafo de LangGraph. |
| `agent-behavior-reviewer` | En cualquier cambio que toque `graph/nodes.py`, `graph/build_graph.py` o prompts de sistema. |

Los tres leen `CLAUDE.md`, `PROGRESS.md` y `BITACORA.md` al iniciar su tarea — es la
memoria compartida del equipo, porque la memoria de Claude Code es privada por
subagente.
