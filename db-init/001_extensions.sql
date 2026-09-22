-- Setup de infraestructura del contenedor Postgres (docker-entrypoint-initdb.d),
-- no una migración de Alembic. La regla "solo autogenerate" aplica a las
-- migraciones de esquema de la app (tablas, columnas, índices) — habilitar la
-- extensión pgvector es un paso de provisioning de la imagen, un prerequisito
-- para que el tipo Vector exista antes de que Alembic pueda autogenerar nada
-- que lo use.
CREATE EXTENSION IF NOT EXISTS vector;
