from app.db.base import Base
from app.db.session import engine
import app.models  # important: ensures models are imported


def init_db():
    Base.metadata.create_all(bind=engine)
