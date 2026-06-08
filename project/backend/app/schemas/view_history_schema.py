from pydantic import BaseModel

class ViewHistoryCreate(BaseModel):
    movie_id: str
    movie_title: str
    genre: str