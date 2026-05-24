import os
import requests

from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OMDB_API_KEY")
# API_KEY = os.getenv("71a4d58a")

BASE_URL = "http://www.omdbapi.com"

def search_movies(title: str):

    response = requests.get(
        f"{BASE_URL}/?apikey={API_KEY}&s={title}"
    )

    return response.json()

def get_movie(imdb_id: str):

    response = requests.get(
        f"{BASE_URL}/?apikey={API_KEY}&i={imdb_id}"
    )

    return response.json()