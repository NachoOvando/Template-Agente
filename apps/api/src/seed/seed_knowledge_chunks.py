"""Siembra `knowledge_chunks` con contenido turístico DUMMY de Catamarca.

Los nombres de lugares son reales pero los datos (horarios, precios, distancias)
están inventados para este kickoff — no usar como fuente de verdad. Cada fila
queda marcada con `source="dummy_catamarca_v1"` e `is_seed_data=True` (default).

Uso:
    python -m seed.seed_knowledge_chunks
"""

import asyncio

from db.models import KnowledgeChunk
from db.session import SessionLocal
from dependencies import get_llm_provider

_SOURCE = "dummy_catamarca_v1"

_CHUNKS: list[str] = [
    "Las Termas de Fiambalá están a unos 15 km del pueblo de Fiambalá, en el oeste "
    "de Catamarca. Tienen piletas de agua termal al aire libre entre 30°C y 45°C, "
    "rodeadas de cerros. Abren todo el año, aunque el acceso puede complicarse en "
    "invierno por nieve en la cuesta.",
    "La Cuesta del Portezuelo conecta el Valle Central con los Valles Calchaquíes "
    "catamarqueños. Es un recorrido en auto con miradores naturales, ideal para "
    "quienes buscan paisaje de montaña sin necesidad de trekking largo.",
    "El Pucará de Aconquija es un sitio arqueológico de origen incaico en la zona "
    "de Andalgalá. Se accede con guía local por un sendero de dificultad media, "
    "de aproximadamente 2 horas de caminata hasta las ruinas.",
    "La Reserva Provincial El Alto-El Manchao protege bosques de alisos y queñoa "
    "en las Sierras de Ambato. Tiene senderos señalizados para trekking de un día, "
    "recomendados para quienes viajan con interés en naturaleza y observación de aves.",
    "El Salar de Antofalla, en el departamento de Antofagasta de la Sierra, es uno "
    "de los salares más extensos del noroeste argentino. Es una excursión de día "
    "completo en vehículo 4x4, a más de 3300 metros de altura.",
    "El Dique y Villa de Las Pirquitas queda a unos 25 minutos de la ciudad de "
    "Catamarca. Es un espejo de agua rodeado de cerros, con opciones de pesca y "
    "paseos en lancha los fines de semana. Bueno para una salida corta en familia.",
    "La Catedral Basílica de Nuestra Señora del Valle, en el centro de la ciudad "
    "de San Fernando del Valle de Catamarca, alberga a la patrona de la provincia. "
    "Recibe peregrinos todo el año, con mayor afluencia en la primera quincena de "
    "diciembre por la fiesta patronal.",
    "La Fiesta Nacional e Internacional del Poncho se celebra en la ciudad capital "
    "en julio, con stands de artesanos de distintas provincias, shows de folclore "
    "y venta de productos regionales. Es uno de los eventos turísticos más grandes "
    "del año en Catamarca.",
    "El poncho catamarqueño se teje tradicionalmente en telar criollo, con lana de "
    "oveja o de llama según la zona. Los talleres artesanales de Londres y "
    "Belén son puntos de referencia para ver el proceso y comprar directo al "
    "artesano.",
    "La Cuesta de Belén une la ciudad de Belén con la Puna catamarqueña, ganando "
    "altura rápidamente entre cardones y quebradas. Es un recorrido recomendado "
    "para quienes ya están aclimatados a la altura.",
    "La gastronomía catamarqueña incluye empanadas al horno de campo, locro y "
    "nueces confitadas — la provincia es una de las principales productoras de "
    "nuez del país, sobre todo en la zona del Valle Central.",
    "El trekking en la Sierra de Ambato ofrece recorridos de distinta dificultad, "
    "desde caminatas cortas cerca de la ciudad de Catamarca hasta ascensos de "
    "varios días para grupos con experiencia de montaña.",
    "Las Termas de Villavil, en el departamento de Andalgalá, son menos conocidas "
    "que las de Fiambalá pero tienen aguas termales naturales en un entorno más "
    "agreste, con menos infraestructura turística alrededor.",
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
