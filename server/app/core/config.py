from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    SMTP_SERVER: str
    SMTP_PORT: int
    SMTP_USERNAME: str
    SMTP_PASSWORD: str
    MAIL_FROM: str
    MAIL_FROM_NAME: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str
    STRIPE_SECRET_KEY: str = os.getenv("STRIPE_SECRET_KEY")


    class Config:
        env_file = ".env"

settings = Settings()
