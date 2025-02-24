from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from passlib.context import CryptContext
from app.core.security import get_password_hash
import secrets

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    token = secrets.token_urlsafe(32)
    db_user = User(
        username=user.name,
        email=user.email,
        hashed_password=hashed_password,
        birth_date=user.dateOfBirth,
        phone_number=user.phoneNumber,
        email_confirmation_token=token,
        is_active=False
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
    
def get_user_by_confirmation_token(db: Session, token: str) -> User:
    return db.query(User).filter(User.email_confirmation_token == token).first()