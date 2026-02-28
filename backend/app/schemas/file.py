from pydantic import BaseModel


class FileCreate(BaseModel):
    name: str
    format: str
    category: str
    author: str | None = None
    content: str | None = None
    file_metadata: dict | None = None


class FileRead(BaseModel):
    name: str
    format: str
    category: str
    author: str | None = None
    content: str | None = None
    file_metadata: dict | None = None

    class Config:
        orm_mode = True
