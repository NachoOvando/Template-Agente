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
- Fuera de alcance en esta fase: ingesta vía n8n, piloto de Jev, Observatorio, widget
  embebible. Son pasos posteriores de la hoja de ruta ya definida.

## Stack y por qué

- **Backend**: FastAPI + LangGraph. El grafo es explícito (`StateGraph` con edges
  condicionales), no un agente de tool-calling libre — cada paso de la conversación
  tiene que poder auditarse leyendo el grafo, no inferirse de logs.
- **Modelo**: Google Gemini (`gemini-3.5-flash-lite`) vía `langchain-google-genai`,
  para generación y extracción estructurada.
- **DB**: PostgreSQL + pgvector, SQLAlchemy, Alembic. Migraciones solo por
  autogenerate — nunca SQL a mano.
- **Entorno local**: Docker Compose, imagen `pgvector/pgvector:pg16`.
- **Frontend de prueba**: HTML/JS estático sin framework. Es un arnés de prueba end-to-end,
  no un producto.

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

## Subagentes

| Subagente | Cuándo se invoca |
|---|---|
| `backend-senior` | Después de cualquier cambio estructural en el backend. Al cerrar una feature de backend, nunca durante la escritura inicial del código. |
| `tester` | Después de cada feature nueva o cambio en el grafo de LangGraph. |
| `agent-behavior-reviewer` | En cualquier cambio que toque `graph/nodes.py`, `graph/build_graph.py` o prompts de sistema. |

Los tres leen `CLAUDE.md`, `PROGRESS.md` y `BITACORA.md` al iniciar su tarea — es la
memoria compartida del equipo, porque la memoria de Claude Code es privada por
subagente.
