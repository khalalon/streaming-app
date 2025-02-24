from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    confirmpassword: str
    dateOfBirth: Optional[date] = None
    phoneNumber: Optional[str] = None

class User(BaseModel):
    id: int
    username: str
    email: EmailStr
    birth_date: Optional[date] = None
    phone_number: Optional[str] = None
    is_active: bool

    class Config:
        from_attributes = True
