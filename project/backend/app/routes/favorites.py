from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.favorite import Favorite
from app.models.user import User
from app.schemas.favorite_schema import FavoriteCreate
from app.services.auth_service import verify_token

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="login"
)

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    email = verify_token(token)

    if not email:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user = db.query(User).filter(
        User.email == email
    ).first()

    return user

@router.post("/favorites")
def add_favorite(
    favorite: FavoriteCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):

    existing = db.query(Favorite).filter(
        Favorite.movie_id == favorite.movie_id,
        Favorite.user_id == user.id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Already in favorites"
        )

    new_favorite = Favorite(
        movie_id=favorite.movie_id,
        title=favorite.title,
        poster=favorite.poster,
        user_id=user.id
    )

    db.add(new_favorite)

    db.commit()

    return {"message": "Added to favorites"}

@router.get("/favorites")
def get_favorites(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):

    return db.query(Favorite).filter(
        Favorite.user_id == user.id
    ).all()

@router.delete("/favorites/{movie_id}")
def remove_favorite(
    movie_id: str,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):

    favorite = db.query(Favorite).filter(
        Favorite.movie_id == movie_id,
        Favorite.user_id == user.id
    ).first()

    if not favorite:
        raise HTTPException(
            status_code=404,
            detail="Favorite not found"
        )

    db.delete(favorite)

    db.commit()

    return {"message": "Favorite removed"}