import secrets
from typing import Optional, Dict, Any, List

from pydantic import AnyHttpUrl, BaseSettings,  PostgresDsn, validator, EmailStr

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 60 minutes * 24 hours * 8 days = 8 days
    PROJECT_NAME: str
    DB_SERVER: str
    DB_NAME: str
    DB_USER: str
    DB_PASSWORD: str
    FIRST_SUPERUSER: str
    FIRST_SUPERUSER_PASSWORD: str
    EMAIL_TEST_USER: EmailStr = "test@example.com"
    USERS_OPEN_REGISTRATION: str
    SQLALCHEMY_DATABASE_URI: Optional[PostgresDsn] = None
    # BACKEND_CORS_ORIGINS is a JSON-formatted list of origins
    # e.g: '["http://localhost", "http://localhost:4200", "http://localhost:3000", \
    # "http://localhost:8080", "http://local.dockertoolbox.tiangolo.com"]'
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    @validator("SQLALCHEMY_DATABASE_URI", pre=True)
    def assemble_db_connection(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v
        return PostgresDsn.build(
            scheme="postgresql+psycopg2",
            user=values.get("DB_USER"),
            password=values.get("DB_PASSWORD"),
            host=values.get("DB_SERVER"),
            path=f"/{values.get('DB_NAME') or ''}",
        )

    class Config:
        case_sensitive = True

settings = Settings()