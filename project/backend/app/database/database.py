from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# ✅ SQLite DB file will be created automatically
DATABASE_URL = "sqlite:///./movies.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

# ✅ Dependency to use DB in routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()