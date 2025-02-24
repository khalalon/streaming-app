from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from datetime import timedelta
from app.schemas.user import UserCreate
from app.crud import user as crud_user
from app.core.security import create_access_token, verify_password
from app.api import deps
from app.utils.email import send_confirmation_email
from app.core.config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter()

@router.post("/register")
async def register_user(user: UserCreate, db: Session = Depends(deps.get_db)):
    db_user = crud_user.get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    if user.password != user.confirmpassword:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Passwords do not match")
    
    new_user = crud_user.create_user(db, user)
    await send_confirmation_email(new_user.email, new_user.email_confirmation_token)
    return {"msg": "User registered successfully, please check your email for confirmation"}

def verify_token(token: str):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

@router.post("/login")
async def login(db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    db_user = crud_user.get_user_by_email(db, form_data.username)
    if not db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect username or password")
    if not db_user.is_active:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email not confirmed")
    if not verify_password(form_data.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect username or password")

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": db_user.email}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/verify-token")
def verify_access_token(token: str = Depends(oauth2_scheme)):
    verify_token(token)
    return {"msg": "Token is valid"}
