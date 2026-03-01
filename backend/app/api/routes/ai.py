import json
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from openai import OpenAI
from app.db.session import get_db
from app.models.file import File as FileModel

router = APIRouter(prefix="/ai", tags=["ai"])
client = OpenAI()


class FileSummaryRequest(BaseModel):
    file_id: int
    question: str | None = None
    model: str | None = None


@router.post("/file_summary/")
def file_summary(payload: FileSummaryRequest, db: Session = Depends(get_db)):
    file_obj = db.query(FileModel).filter(
        FileModel.id == payload.file_id).first()
    if not file_obj:
        raise HTTPException(status_code=404, detail="File not found")

    file_details = {
        "name": file_obj.name,
        "format": file_obj.format,
        "category": file_obj.category,
        "author": file_obj.author,
        "file_metadata": file_obj.file_metadata,
        "content": file_obj.content,
    }

    MAX_CHARS = 2000
    if file_details["content"]:
        file_details["content"] = file_details["content"][:MAX_CHARS]

    question = f"""
        Give a summary of the file content and metadata. "
        "Not smaller than 300 characters, not longer than {MAX_CHARS} characters.
        Answer in the same language as the user's browser setting. If the content is 
        not in a natural language, answer in English.
    """

    prompt = (
        "You are given a file record from our database.\n"
        "Use ONLY the provided fields.\n\n"
        f"Task: {question}\n\n"
        "File record (JSON):\n"
        f"{json.dumps(file_details, ensure_ascii=False)}"
    )

    try:
        resp = client.responses.create(
            model=payload.model or "gpt-4.1-mini",
            input=prompt,
        )
        return {"answer": resp.output_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
