import json
from fastapi import Query, APIRouter, Depends, UploadFile, File as FastAPIFile, Form, HTTPException
from sqlalchemy import or_, and_, asc, desc
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.file import File as FileModel
from app.schemas.file import FileRead
from app.enums.format import Format, parse_format
from app.enums.category import parse_category
from app.services.extractor import extract_content_and_meta
from datetime import datetime


router = APIRouter(prefix="/files", tags=["files"])


@router.get("/", response_model=list[FileRead])
def retrieve_all_files(db: Session = Depends(get_db)):
    files = db.query(FileModel).all()
    return files


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

    elif final_format == Format.CSV:
        final_name = final_name or (upload.filename or "untitled.csv")

    elif final_format == Format.ODS:
        final_name = final_name or (upload.filename or "untitled.ods")

    elif final_format == Format.ODT:
        final_name = final_name or (upload.filename or "untitled.odt")

    elif final_format == Format.PNG:
        final_name = final_name or (upload.filename or "untitled.png")

    elif final_format == Format.JPG:
        final_name = final_name or (upload.filename or "untitled.jpg")

    elif final_format == Format.JPEG:
        final_name = final_name or (upload.filename or "untitled.jpeg")

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
        created_at=datetime.now(),
        updated_at=datetime.now(),
        file_metadata=meta_to_store if meta_to_store else None
    )

    db.add(new_file)
    db.commit()
    db.refresh(new_file)
    return new_file


@router.get("/search_files/", response_model=list[FileRead])
def search_files(
    db: Session = Depends(get_db),
    format: str | None = Query(None),
    name: str | None = Query(None),
    category: str | None = Query(None),
    keywords: str | None = Query(None, description="Search in name/content"),
    orderBy: str | None = Query("created_at"),  # change default if you want
    order: str = Query("desc", pattern="^(asc|desc)$"),
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
):

    query = db.query(FileModel)

    if name:
        name_like = f"%{name}%"
        query = query.filter(FileModel.name.ilike(name_like))

    if format:
        fmt = parse_format(format_str=format)
        if not fmt:
            raise HTTPException(
                status_code=400, detail=f"Unsupported format: {format}")
        query = query.filter(FileModel.format == fmt.acronym)

    if category:
        cat = parse_category(category_str=category)
        if not cat:
            raise HTTPException(
                status_code=400, detail=f"Unsupported category: {category}")
        query = query.filter(FileModel.category == cat.value)

    if keywords:
        keyword_filters = []
        for word in keywords.split():
            like = f"%{word}%"
            keyword_filters.append(
                or_(
                    FileModel.name.ilike(like),
                    FileModel.content.ilike(like),
                    FileModel.file_metadata["title"].astext.ilike(like),
                    FileModel.file_metadata["author"].astext.ilike(like),
                )
            )
        query = query.filter(and_(*keyword_filters))

    order_map = {
        "name": FileModel.name,
        "format": FileModel.format,
        "category": FileModel.category,
        "author": FileModel.author,
    }

    sort_column = order_map.get(orderBy)
    if not sort_column:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported orderBy. Allowed: {', '.join(order_map.keys())}"
        )

    query = query.order_by(asc(sort_column) if order ==
                           "asc" else desc(sort_column))

    return query.all()
