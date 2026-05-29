import os
import requests
from dotenv import load_dotenv

load_dotenv()

# =========================
# API CONFIG
# =========================
API_KEY = os.getenv("OMDB_API_KEY")
BASE_URL = "http://www.omdbapi.com/"


# =========================
# SEARCH MOVIES (by title)
# =========================
def search_movies(title: str):
    url = f"{BASE_URL}?apikey={API_KEY}&s={title}"
    response = requests.get(url)
    return response.json()


# =========================
# GET MOVIE DETAILS (by IMDb ID)
# =========================
def get_movie(imdb_id: str):
    url = f"{BASE_URL}?apikey={API_KEY}&i={imdb_id}"
    response = requests.get(url)
    return response.json()