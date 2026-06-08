from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.view_history import ViewHistory
from app.models.user import User

from app.models.user_preference import UserPreference

from app.schemas.view_history_schema import (
    ViewHistoryCreate
)

from app.services.auth_service import (
    get_current_user
)

router = APIRouter(
    prefix="/view-history",
    tags=["View History"]
)

@router.post("/view-history")
def add_view_history(
    payload: ViewHistoryCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):

    # SAVE VIEW HISTORY
    history = ViewHistory(
        movie_id=payload.movie_id,
        movie_title=payload.movie_title,
        genre=payload.genre,
        user_id=user.id
    )

    db.add(history)

    # UPDATE USER PREFERENCE
    preference = db.query(
        UserPreference
    ).filter(
        UserPreference.user_id == user.id,
        UserPreference.genre == payload.genre
    ).first()

    if preference:

        preference.score += 1

    else:

        preference = UserPreference(
            genre=payload.genre,
            score=1,
            user_id=user.id
        )

        db.add(preference)

    db.commit()

    return {
        "success": True,
        "message": "View history saved and preference updated"
    }