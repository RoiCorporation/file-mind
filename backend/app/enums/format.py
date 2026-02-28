from enum import Enum


class Format(Enum):
    # Documents
    PDF = ("PDF", ".pdf")
    DOC = ("DOC", ".doc")
    DOCX = ("DOCX", ".docx")
    XLS = ("XLS", ".xls")
    XLSX = ("XLSX", ".xlsx")
    PPT = ("PPT", ".ppt")
    PPTX = ("PPTX", ".pptx")
    TXT = ("TXT", ".txt")
    RTF = ("RTF", ".rtf")
    ODT = ("ODT", ".odt")
    ODS = ("ODS", ".ods")
    ODP = ("ODP", ".odp")
    CSV = ("CSV", ".csv")
    MD = ("MD", ".md")
    EPUB = ("EPUB", ".epub")

    # Images
    JPG = ("JPG", ".jpg")
    JPEG = ("JPEG", ".jpeg")
    PNG = ("PNG", ".png")
    GIF = ("GIF", ".gif")
    BMP = ("BMP", ".bmp")
    TIFF = ("TIFF", ".tiff")
    SVG = ("SVG", ".svg")
    WEBP = ("WEBP", ".webp")
    HEIC = ("HEIC", ".heic")
    ICO = ("ICO", ".ico")
    PSD = ("PSD", ".psd")
    AI = ("AI", ".ai")

    # Audio
    MP3 = ("MP3", ".mp3")
    WAV = ("WAV", ".wav")
    AAC = ("AAC", ".aac")
    FLAC = ("FLAC", ".flac")
    OGG = ("OGG", ".ogg")
    WMA = ("WMA", ".wma")
    M4A = ("M4A", ".m4a")

    # Video
    MP4 = ("MP4", ".mp4")
    MKV = ("MKV", ".mkv")
    AVI = ("AVI", ".avi")
    MOV = ("MOV", ".mov")
    WMV = ("WMV", ".wmv")
    FLV = ("FLV", ".flv")
    WEBM = ("WEBM", ".webm")
    M4V = ("M4V", ".m4v")

    # Archives
    ZIP = ("ZIP", ".zip")
    RAR = ("RAR", ".rar")
    TAR = ("TAR", ".tar")
    GZ = ("GZ", ".gz")
    TGZ = ("TGZ", ".tgz")
    BZ2 = ("BZ2", ".bz2")
    XZ = ("XZ", ".xz")
    SEVEN_Z = ("7Z", ".7z")

    # Executables / Installers
    EXE = ("EXE", ".exe")
    MSI = ("MSI", ".msi")
    APK = ("APK", ".apk")
    APP = ("APP", ".app")
    DMG = ("DMG", ".dmg")
    BAT = ("BAT", ".bat")
    SH = ("SH", ".sh")

    # Code Files
    PY = ("PY", ".py")
    JAVA = ("JAVA", ".java")
    C = ("C", ".c")
    CPP = ("CPP", ".cpp")
    H = ("H", ".h")
    CS = ("CS", ".cs")
    JS = ("JS", ".js")
    TS = ("TS", ".ts")
    HTML = ("HTML", ".html")
    CSS = ("CSS", ".css")
    PHP = ("PHP", ".php")
    GO = ("GO", ".go")
    RS = ("RS", ".rs")
    SWIFT = ("SWIFT", ".swift")
    KT = ("KT", ".kt")
    JSON = ("JSON", ".json")
    XML = ("XML", ".xml")
    YAML = ("YAML", ".yaml")
    YML = ("YML", ".yml")
    SQL = ("SQL", ".sql")

    # Data / Database
    SQLITE = ("SQLITE", ".sqlite")
    DB = ("DB", ".db")
    MDB = ("MDB", ".mdb")
    PARQUET = ("PARQUET", ".parquet")
    AVRO = ("AVRO", ".avro")

    # Fonts
    TTF = ("TTF", ".ttf")
    OTF = ("OTF", ".otf")
    WOFF = ("WOFF", ".woff")
    WOFF2 = ("WOFF2", ".woff2")

    # System / Config
    INI = ("INI", ".ini")
    CFG = ("CFG", ".cfg")
    CONF = ("CONF", ".conf")
    LOG = ("LOG", ".log")
    ENV = ("ENV", ".env")
    TMP = ("TMP", ".tmp")
    BAK = ("BAK", ".bak")
    UNK = ("UNK", "UNK")

    def __init__(self, acronym, file_format):
        self.acronym = acronym
        self.file_format = file_format


def parse_format(format_str: str) -> Format:
    for format in Format:
        if format.acronym == format_str.upper():
            return format
    return Format.UNK
