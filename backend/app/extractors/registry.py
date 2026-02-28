from app.extractors.pdf import PdfExtractor

_PDF = PdfExtractor()


def get_extractor(content_type: str | None, filename: str):
    ct = (content_type or "").lower()
    name = filename.lower()

    if ct == "application/pdf" or name.endswith(".pdf"):
        return _PDF

    raise ValueError(
        f"No extractor for content_type={content_type} filename={filename}")
