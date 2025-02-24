from sqlalchemy import Column, Integer, String, Boolean, Date
from app.db.base import Base  # Import Base from db.base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(30), unique=True, index=True)
    email = Column(String(50), unique=True, index=True)
    hashed_password = Column(String(255))
    birth_date = Column(Date)
    phone_number = Column(String(20))
    is_active = Column(Boolean, default=False)
    email_confirmation_token = Column(String(255), unique=True, index=True)
