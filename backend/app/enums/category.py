from enum import Enum


class Category(Enum):
    LEGAL = "Legal"
    FINANCE = "Finance"
    REPORT = "Report"
    CERTIFICATE = "Certificate"
    UNKNOWN = "Unknown"


def parse_category(category_str: str) -> Category:
    for category in Category:
        if category.name == category_str.upper():
            return category
    return Category.UNKNOWN
