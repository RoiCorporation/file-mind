# app/extractors/pdf.py
from dataclasses import dataclass
from pypdf import PdfReader


@dataclass
class ExtractionResult:
    text: str
    meta: dict


class PdfExtractor:
    def extract(self, path: str) -> ExtractionResult:
        reader = PdfReader(path)
        parts = []
        for page in reader.pages:
            parts.append(page.extract_text() or "")
        text = "\n".join(parts)
        return ExtractionResult(
            text=text,
            meta={"pages": len(reader.pages), "engine": "pypdf"},
        )
