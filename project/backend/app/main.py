from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.database.database import engine
from app.models.user import User
from app.models.favorite import Favorite
from app.models.review import Review

from app.routes.auth import router as auth_router
from app.routes.movies import router as movies_router
from app.routes.favorites import router as favorites_router
from app.routes.reviews import router as reviews_router

from app.models.review import Review
from app.models.search_history import SearchHistory

from app.database.database import Base

from app.routes import reviews, history

from app.routes.dashboard import (
    router as dashboard_router
)

from fastapi.exceptions import (
    RequestValidationError
)

from app.utils.exceptions import (
    validation_exception_handler
)

# CREATE TABLES
Base.metadata.create_all(bind=engine)

app = FastAPI()


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#Register
app.add_exception_handler(
    RequestValidationError,
    validation_exception_handler
)

# ROUTES
app.include_router(auth_router)
app.include_router(movies_router)
app.include_router(favorites_router)
app.include_router(reviews_router)

# app.include_router(reviews.router)
app.include_router(history.router)

app.include_router(dashboard_router)

@app.get("/")
def home():

    return {
        "message": "Movie API Running"
    }