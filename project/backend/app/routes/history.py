from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.search_history import SearchHistory
from app.models.user import User
from app.routes.favorites import get_current_user

router = APIRouter()

# SAVE SEARCH (helper endpoint OR call inside movies search)
def save_search(keyword: str, user: User, db: Session):
    history = SearchHistory(
        keyword=keyword,
        user_id=user.id
    )
    db.add(history)
    db.commit()


# GET HISTORY
@router.get("/history")
def get_history(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    data = db.query(SearchHistory)\
        .filter(SearchHistory.user_id == user.id)\
        .order_by(SearchHistory.searched_at.desc())\
        .all()

    return {
        "success": True,
        "data": [
            {
                "keyword": d.keyword,
                "searched_at": d.searched_at
            } for d in data
        ]
    }