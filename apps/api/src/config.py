from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    google_api_key: str = ""
    database_url: str = "postgresql+psycopg://cata:cata@localhost:5432/cata"
    internal_api_key: str = ""

    gemini_model: str = "gemini-3.5-flash-lite"
    gemini_embedding_model: str = "models/text-embedding-004"
    embedding_dimensions: int = 768


@lru_cache
def get_settings() -> Settings:
    return Settings()
