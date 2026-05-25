from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User
from app.schemas.user_schema import UserRegister, UserLogin
from app.services.auth_service import (
    hash_password,
    verify_password,
    create_access_token
)
from app.utils.response import success_response, error_response

router = APIRouter()


# =========================
# REGISTER
# =========================
@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail=error_response("Email already exists")
        )

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return success_response(
        "User registered successfully",
        {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email
        }
    )


# =========================
# LOGIN (FIXED)
# =========================
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail=error_response("Invalid email")
        )

    if not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=401,
            detail=error_response("Invalid password")
        )

    token = create_access_token({"sub": db_user.email})

    return success_response(
        "Login successful",
        {
            "access_token": token,
            "token_type": "bearer"
        }
    )