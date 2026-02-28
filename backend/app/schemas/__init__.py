from pydantic import BaseModel


class FileCreate(BaseModel):
    name: str
    format: str
    author: str
    category: str
    content: str


class FileRead(BaseModel):
    id: int
    name: str
    format: str
    category: str
    content: str
    created_at: str
    updated_at: str

    model_config = {"from_attributes": True}
