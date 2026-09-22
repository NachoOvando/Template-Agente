"""Rate limiting mínimo para endpoints expuestos públicamente (ej. el widget
embebido, que cualquier visitante de un sitio de terceros puede disparar y
cada mensaje cuesta una llamada real a Gemini).

# ponytail: contador in-memory por proceso, sin límite compartido entre
# workers/instancias. Suficiente para un solo proceso uvicorn (este MVP);
# si se escala a más de un worker o instancia, pasar a un backend compartido
# (Redis) — cada proceso tendría su propio balde y el límite real sería
# N * _MAX_REQUESTS.
"""

import time
from collections import defaultdict, deque

from fastapi import HTTPException, Request, status

_WINDOW_SECONDS = 60
_MAX_REQUESTS = 20

_requests: dict[str, deque[float]] = defaultdict(deque)


def check_rate_limit(request: Request) -> None:
    client_ip = request.client.host if request.client else "unknown"
    now = time.monotonic()
    timestamps = _requests[client_ip]

    while timestamps and now - timestamps[0] > _WINDOW_SECONDS:
        timestamps.popleft()

    if len(timestamps) >= _MAX_REQUESTS:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Demasiados mensajes. Esperá un minuto y volvé a intentar.",
        )

    timestamps.append(now)
