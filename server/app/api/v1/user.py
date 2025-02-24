from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.user import User as UserSchema
from app.api import deps
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=UserSchema)
def get_user(db: Session = Depends(deps.get_db)):
    return db.query(User).all()
