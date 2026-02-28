from fastapi import APIRouter
from app.api.routes.health import router as health_router
from app.api.routes.files import router as files_router


router = APIRouter()
router.include_router(health_router, tags=["health"])
router.include_router(files_router, tags=["files"])
