from fastapi import APIRouter, Depends, UploadFile, File as FastAPIFile, Form, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.file import File as FileModel
from app.schemas.file import FileRead
from app.enums.format import Format, parse_format
from app.enums.category import parse_category
import json
from app.services.extractor import extract_content_and_meta


router = APIRouter(prefix="/files", tags=["files"])


@router.post("/import_file/", response_model=FileRead)
async def import_file(
    name: str | None = Form(None),
    author: str | None = Form(None),
    category: str | None = Form(None),
    format: str | None = Form(None),
    upload: UploadFile | None = FastAPIFile(None),
    file_metadata: str | None = Form(None),
    db: Session = Depends(get_db)
):
    if upload is None:
        raise HTTPException(
            status_code=400, detail="Provide either 'upload' (file) or 'content' (text).")

    extracted_meta: dict | None = None
    final_name = name
    final_author = author
    final_format = format if format else ""
    final_category = category if category else ""
    final_content = ""

    filename = (upload.filename or "").lower()
    inferred = filename.rsplit(
        ".", 1)[-1].lower() if "." in filename else None
    final_format = parse_format(format_str=final_format)
    final_category = parse_category(category_str=final_category)

    data = await upload.read()

    final_content, extracted_meta = extract_content_and_meta(
        data, final_format, upload.filename)

    # PDF path
    if final_format == Format.PDF:
        pdf_title = extracted_meta.get("title") if extracted_meta else None
        pdf_author = extracted_meta.get(
            "author") if extracted_meta else None
        final_name = final_name or pdf_title or (
            upload.filename or "untitled.pdf")
        final_author = final_author or pdf_author

    elif final_format == Format.TXT:
        final_name = final_name or (upload.filename or "untitled.txt")

    elif final_format == Format.DOCX:
        final_name = final_name or (upload.filename or "untitled.docx")

    elif final_format == Format.XLSX:
        final_name = final_name or (upload.filename or "untitled.xlsx")

    elif final_format == Format.ODS:
        final_name = final_name or (upload.filename or "untitled.ods")

    elif final_format == Format.ODT:
        final_name = final_name or (upload.filename or "untitled.odt")

    elif final_format == Format.PNG:
        final_name = final_name or (upload.filename or "untitled.png")

    if final_name is None:
        raise HTTPException(
            status_code=400, detail="Name is required (provide 'name' field or include it in file metadata).")

    # Choose metadata to store:
    # - if client provided file_metadata (as JSON string), use that
    # - else if we extracted metadata from PDF, use that
    meta_to_store = None
    if file_metadata:
        try:
            meta_to_store = json.loads(file_metadata)
        except json.JSONDecodeError:
            raise HTTPException(
                status_code=400, detail="file_metadata must be valid JSON")
    elif extracted_meta:
        meta_to_store = extracted_meta

    # final fallbacks
    if not final_name:
        final_name = "untitled"
    if not final_format:
        raise Exception(
            "Could not determine file format. Please provide a valid 'format' or upload a supported file type.")

    new_file = FileModel(
        name=final_name,
        format=final_format.acronym,
        author=final_author,
        category=final_category.value,
        content=final_content,
        file_metadata=meta_to_store if meta_to_store else None,
    )

    db.add(new_file)
    db.commit()
    db.refresh(new_file)
    return new_file


@router.get("/", response_model=list[FileRead])
def retrieve_all_files(db: Session = Depends(get_db)):
    files = db.query(FileModel).all()
    return files
