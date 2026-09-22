# CLAUDE.md — Cata (agente de ejemplo, Visit Catamarca)

Este archivo es específico de este repo. No repite lo que ya cubren los skills globales
(`project-structure`, `api-conventions`, `db-conventions`, `testing-patterns`) — para
estructura de carpetas, convenciones de API y de esquema, esos skills mandan.

## Qué es esto y qué no es

Cata es un agente conversacional de turismo para Visit Catamarca. Este repo es el
**kickoff de ejemplo**: una versión reducida pero arquitectónicamente correcta, para
validar el enfoque antes de escalarlo al proyecto real.

- **Es**: template reusable, base para futuros agentes del mismo tipo.
- **No es**: el sistema completo de Catamarca, ni un descartable de prueba de concepto
  que se tira después de este kickoff.
- Fuera de alcance en esta fase: ingesta vía n8n, piloto de Jev, Observatorio. Son
  pasos posteriores de la hoja de ruta ya definida.
- El widget embebible (`apps/web/dist-widget/widget.js`) se adelantó a pedido
  explícito del usuario — ver sección "Widget embebible" más abajo.

## Stack y por qué

- **Backend**: FastAPI + LangGraph. El grafo es explícito (`StateGraph` con edges
  condicionales), no un agente de tool-calling libre — cada paso de la conversación
  tiene que poder auditarse leyendo el grafo, no inferirse de logs.
- **Modelo**: Google Gemini (`gemini-3.5-flash-lite`) vía `langchain-google-genai`,
  para generación y extracción estructurada.
- **DB**: PostgreSQL + pgvector, SQLAlchemy, Alembic. Migraciones solo por
  autogenerate — nunca SQL a mano.
- **Entorno local**: Docker Compose, imagen `pgvector/pgvector:pg16`.
- **Producción**: backend desplegado en [InsForge](https://insforge.dev)
  (Compute para el contenedor, su Postgres gestionado como DB) — decisión
  explícita del usuario. InsForge se usa **solo como hosting**: seguimos con
  SQLAlchemy/Alembic tal cual, nunca su SDK/PostgREST propio. Detalle de
  URLs, redeploy y migraciones en `PROGRESS.md` (sección "Producción").
- **Frontend de prueba**: React + Vite + Tailwind CSS 4, componentes de
  [beUI](https://beui.dev) (`message`, `input`, `button-stateful`,
  `animated-toast-stack`) instalados vía shadcn — decisión explícita del
  usuario para definir el UI/UX del chat. Sigue siendo un arnés de prueba
  end-to-end, no un producto: sin sidebar, sin navegación, sin persistencia
  de conversación más allá de la sesión del navegador. Ver `apps/web/README.md`.

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
| `extract_profile` | Extrae slots (`interes`, `tipo_grupo`, `duracion_viaje`, `epoca_del_anio`) del mensaje vía `LLMProvider.extract_structured()`. Primera mención gana — no pisa un slot ya lleno. Calcula `missing_slot`. | Sí (extracción estructurada, no generación libre) |
| `route_after_extraction` (edge condicional) | Lee `missing_slot` y decide la rama. Código plano. | No |
| `ask_clarifying` | Pregunta por el slot obligatorio faltante, con templates fijos por slot. | No |
| `retrieve_context` | Embedding del mensaje + búsqueda por similitud en `knowledge_chunks` (pgvector). Lista vacía es un resultado válido, no un error. | Solo embeddings, no generación |
| `generate_response` | Única fuente de texto libre para el usuario cuando hay contexto recuperado. Guardrail anti-alucinación (regla no negociable #2) explícito en el prompt: si no hay contexto relevante, lo dice, nunca completa con conocimiento general. | Sí (generación) |

`extract_profile` es la función aislada que en el futuro migra a Jev — no tiene
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
