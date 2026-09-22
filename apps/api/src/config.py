from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    google_api_key: str = ""
    database_url: str = "postgresql+psycopg://app:app@localhost:5432/app"
    internal_api_key: str = ""

    gemini_model: str = "gemini-3.5-flash-lite"
    gemini_embedding_model: str = "models/gemini-embedding-001"
    embedding_dimensions: int = 768

    # Orígenes permitidos para CORS, separados por coma. El widget embebible
    # (apps/web/src/widget-entry.tsx) y la página de prueba pegan directo a
    # esta API desde el navegador — nunca "*" fuera de desarrollo local, o
    # cualquier sitio podría consumir la API a costa de nuestra cuota de Gemini.
    cors_allowed_origins: str = "http://localhost:5173"

    @property
    def cors_allowed_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_allowed_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
