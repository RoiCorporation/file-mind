from fastapi import APIRouter
from app.api.routes.files import router as files_router
from app.api.routes.ai import router as ai_router


router = APIRouter()
router.include_router(files_router, tags=["files"])
router.include_router(ai_router, tags=["ai"])
