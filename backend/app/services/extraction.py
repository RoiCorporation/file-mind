from app.extractors.registry import get_extractor
from app.services.upload_repo import get_upload_by_id, store_extracted_text


def extract_and_store(upload_id: str):
    upload = get_upload_by_id(upload_id)  # from DB

    extractor = get_extractor(
        content_type=upload.content_type,
        filename=upload.filename,
    )

    result = extractor.extract(path=upload.path)

    store_extracted_text(
        upload_id=upload_id,
        text=result.text,
        meta=result.meta,
    )
