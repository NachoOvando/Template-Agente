"""Siembra `knowledge_chunks` con contenido DUMMY de ejemplo.

Placeholder — reemplazar por contenido real de tu base de conocimiento antes
de producción. Cada fila queda marcada con `source="dummy_seed_v1"` e
`is_seed_data=True` (default).

Uso:
    python -m seed.seed_knowledge_chunks
"""

import asyncio

from db.models import KnowledgeChunk
from db.session import SessionLocal
from dependencies import get_llm_provider

_SOURCE = "dummy_seed_v1"

_CHUNKS: list[str] = [
    "Este es un chunk de ejemplo — reemplazar por contenido real de tu base de "
    "conocimiento. El agente solo puede responder con información que esté acá "
    "adentro (regla no negociable #2, anti-alucinación).",
    "Otro chunk de ejemplo. Cada fila de knowledge_chunks se embebe una vez al "
    "sembrarla y se compara por similitud coseno contra el embedding del mensaje "
    "del usuario en retrieve_context_node.",
    "Tercer chunk de ejemplo, para que la búsqueda por similitud tenga más de un "
    "resultado posible entre los que elegir según relevancia.",
    "Cuarto chunk de ejemplo — si tu dominio tiene categorías distintas de "
    "contenido (por ejemplo, temas o secciones), este es un buen lugar para "
    "empezar a modelarlas antes de escalar el volumen real de datos.",
]


async def main() -> None:
    llm_provider = get_llm_provider()

    with SessionLocal() as db:
        existing = db.query(KnowledgeChunk).filter_by(source=_SOURCE).count()
        if existing:
            print(f"Ya hay {existing} chunks con source='{_SOURCE}'. No se vuelve a sembrar.")
            return

        embeddings = await llm_provider.embed(_CHUNKS)
        for content, embedding in zip(_CHUNKS, embeddings, strict=True):
            db.add(KnowledgeChunk(content=content, source=_SOURCE, embedding=embedding))
        db.commit()

    print(f"Sembrados {len(_CHUNKS)} knowledge_chunks (source='{_SOURCE}').")


if __name__ == "__main__":
    asyncio.run(main())
