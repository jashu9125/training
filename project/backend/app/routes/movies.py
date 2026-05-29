from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.search_history import SearchHistory

from app.services.omdb_service import search_movies, get_movie

router = APIRouter()


# =========================
# HOME MOVIES (NO AUTH)
# =========================
@router.get("/movies")
def home_movies():
    return search_movies("batman")


# =========================
# SEARCH MOVIES
# =========================
@router.get("/movies/search")
def search(title: str, db: Session = Depends(get_db)):

    data = search_movies(title)

    if not data or data.get("Response") == "False":
        return []

    movies = data.get("Search", [])

    # OPTIONAL: SAVE SEARCH HISTORY
    try:
        history = SearchHistory(
            keyword=title
        )
        db.add(history)
        db.commit()

    except Exception as e:
        print("History save error:", e)

    return movies


# =========================
# GET MOVIE BY TITLE (optional)
# =========================
@router.get("/movies/{title}")
def search_by_title(title: str):

    data = search_movies(title)

    if not data or data.get("Response") == "False":
        raise HTTPException(
            status_code=404,
            detail="Movie not found"
        )

    return data


# =========================
# GET MOVIE DETAILS BY IMDB ID (NEW FIX)
# =========================
@router.get("/movies/id/{imdb_id}")
def get_movie_details(imdb_id: str):

    data = get_movie(imdb_id)

    if not data or data.get("Response") == "False":
        raise HTTPException(
            status_code=404,
            detail="Movie not found"
        )

    return data