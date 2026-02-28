from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.user import UserCreate, UserRead
from app.services.user_service import create_user, list_users

router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=list[UserRead])
def get_users(db: Session = Depends(get_db)):
    return list_users(db)


@router.post("", response_model=UserRead, status_code=201)
def post_user(payload: UserCreate, db: Session = Depends(get_db)):
    try:
        return create_user(db, payload.email, payload.name)
    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e))
