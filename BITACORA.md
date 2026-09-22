# Bitácora — problemas resueltos

Cada vez que algo se rompe y se soluciona (bug, decisión de diseño que falló, enfoque que resultó peor de lo esperado), se documenta acá. Antes de tocar código en un área, buscar entradas relacionadas por palabra clave.

---

## 2026-09-22 — Alembic autogenerate no importaba `pgvector.sqlalchemy.Vector`
**Dónde:** `alembic/env.py`, `alembic/versions/`
**Problema:** La primera migración autogenerada (`create knowledge_chunks table`) referenciaba `pgvector.sqlalchemy.vector.VECTOR(dim=768)` en la columna `embedding` pero no agregaba el `import pgvector.sqlalchemy` al archivo — la migración generada no era Python válido.
**Causa raíz:** Alembic solo sabe renderizar tipos de SQLAlchemy estándar en el `import` block del script generado. Un tipo custom como `Vector` de la librería `pgvector` no tiene un renderer registrado por default, así que autogenerate lo estampa como repr del objeto sin resolver de dónde importarlo.
**Solución:** Se agregó un callback `render_item` en `alembic/env.py` (pasado a `context.configure()`) que detecta instancias de `Vector` y le indica a Alembic explícitamente qué importar y cómo renderizarlas. Con eso, `alembic revision --autogenerate` genera un archivo correcto sin tocar el `.py` de la migración a mano.
**Regla extraída:** Cuando se agregue un tipo de columna que no sea nativo de SQLAlchemy (pgvector u otro futuro), el fix va en `alembic/env.py` (config de autogenerate), nunca editando el archivo de migración generado — eso rompería la regla de "solo autogenerate".

## 2026-09-22 — `CREATE EXTENSION vector` no puede salir de Alembic autogenerate
**Dónde:** `db-init/001_extensions.sql`, `docker-compose.yml`
**Problema:** La regla no negociable dice "Alembic solo autogenerate, nunca SQL a mano", pero para que el tipo `Vector` exista en Postgres hace falta `CREATE EXTENSION vector` — y autogenerate no detecta ni genera eso: solo compara el metadata de SQLAlchemy contra el esquema existente, no sabe nada de extensiones.
**Causa raíz:** Confundir "nunca SQL a mano" (que aplica a las migraciones de esquema de la app: tablas, columnas, índices) con "cero SQL en todo el repo". Son cosas distintas — habilitar una extensión de Postgres es provisioning de infraestructura, no una migración de esquema versionada por Alembic.
**Solución:** Se movió el `CREATE EXTENSION IF NOT EXISTS vector;` a `db-init/001_extensions.sql`, montado como `docker-entrypoint-initdb.d` en el servicio `db` de `docker-compose.yml`. Corre una sola vez, al inicializar el volumen de Postgres, antes de que Alembic toque la base.
**Regla extraída:** Extensiones de Postgres (pgvector, pgcrypto, etc.) se habilitan en `db-init/`, no en una migración de Alembic. Si se agrega una extensión nueva, el archivo va ahí con un comentario explicando por qué no es una migración.

## 2026-09-22 — Race condition: mensajes concurrentes a la misma sesión se pisaban el estado
**Dónde:** `services/conversation_service.py`
**Problema:** El subagente `tester` (corrido como agente general, ver PROGRESS.md) encontró que dos mensajes casi simultáneos a la misma `session_id` (doble clic, retry del cliente) podían perder el turno anterior completo — no solo el `visitor_profile`, todo el `AgentState`. Lo reprodujo con `asyncio.gather` contra el `ConversationService` real: el perfil final quedó con `interes=None` en vez de `"trekking"`.
**Causa raíz:** `handle_message` hacía `get` → `await self._graph.ainvoke(...)` → `set` sobre un dict plano, sin lock. Entre el `get` y el `set` hay varios puntos `await` reales (extracción estructurada, embeddings, generación) — si dos requests para la misma sesión entrelazan ahí, la que termina último pisa a la que terminó antes. Se agrava porque `get_conversation_service()` es `@lru_cache`: un único `ConversationService` compartido por toda la app, así que el escenario es alcanzable desde un cliente real, no solo un test sintético.
**Solución:** Lock por sesión (`asyncio.Lock` en un `defaultdict`, una entrada por `session_id`) alrededor de todo `handle_message`. Sesiones distintas no se bloquean entre sí — solo se serializan los turnos de una misma conversación, que es el comportamiento correcto de todos modos (un agente no debería procesar dos mensajes de la misma charla en paralelo). Test de regresión: `tests/test_graph.py::test_mensajes_concurrentes_misma_sesion_no_se_pisan`, con un `FakeLLMProvider` con `sleep` para forzar el entrelazado — confirmado que falla sin el lock y pasa con él.
**Regla extraída:** Cualquier estado mutable compartido entre requests (dict, cache, etc.) que se lea y escriba alrededor de un `await` necesita lock o algún mecanismo de exclusión — "es in-memory así que no hay problema de concurrencia" es falso en asyncio en cuanto hay un `await` en el medio.
