from pydantic import BaseModel
from datetime import datetime


class FileCreate(BaseModel):
    name: str
    format: str
    category: str
    author: str | None = None
    content: str | None = None
    created_at: datetime | None = None
    updated_at: datetime | None = None


class FileRead(BaseModel):
    name: str
    format: str
    category: str
    author: str | None = None
    content: str | None = None
    file_metadata: dict | None = None
    created_at: datetime | None = None
    updated_at: datetime | None = None

    class Config:
        orm_mode = True
