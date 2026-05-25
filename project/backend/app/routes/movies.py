from fastapi import APIRouter, HTTPException

# ✅ FIXED IMPORT
from app.services.omdb_service import search_movies

router = APIRouter()


@router.get("/movies")
def home_movies():

    data = search_movies("batman")

    return data


@router.get("/movies/search")
def search(title: str):

    data = search_movies(title)

    if data.get("Response") == "False":
        return []

    return data.get("Search", [])


@router.get("/movies/{title}")
def search_by_title(title: str):

    data = search_movies(title)

    if data.get("Response") == "False":

        raise HTTPException(
            status_code=404,
            detail="Movie not found"
        )

    return data