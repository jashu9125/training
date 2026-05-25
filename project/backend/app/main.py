from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine

from app.routes import auth, movies, favorites


# CREATE TABLES
Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Backend is running"}


# =========================
# CORS CONFIGURATION
# =========================
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]


app.add_middleware(
    CORSMiddleware,

    allow_origins=origins,

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# ROUTES
app.include_router(auth.router)

app.include_router(movies.router)

app.include_router(favorites.router)