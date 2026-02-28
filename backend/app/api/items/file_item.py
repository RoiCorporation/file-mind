from backend.app.enums.file_format import FileType


class File:

    def __init__(self, file_type: FileType, content: str):
        self.file_type = file_type
        self.content = content
