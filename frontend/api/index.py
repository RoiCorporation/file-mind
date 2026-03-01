import os
from app.main import app


@app.middleware("http")
async def vercel_path_middleware(request, call_next):
    qp = dict(request.query_params)
    if "path" in qp and request.url.path.startswith("/api/index.py"):
        request.scope["path"] = "/" + qp["path"].lstrip("/")
    return await call_next(request)