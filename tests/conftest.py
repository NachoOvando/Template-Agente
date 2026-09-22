import pytest

import rate_limit


@pytest.fixture(autouse=True)
def _reset_rate_limiter():
    """El rate limiter es un dict a nivel de módulo (ver rate_limit.py) —
    sin esto, tests que pegan varias veces a /messages contaminarían el
    contador de otros tests que corren en el mismo proceso."""
    rate_limit._requests.clear()
    yield
    rate_limit._requests.clear()
