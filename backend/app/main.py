import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.router import router as api_router
from app.db.init_db import init_db


origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app = FastAPI(title="FileMind API", version="1.0")
app.include_router(api_router, prefix="/v1")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    try:
        init_db()
    except Exception as e:
        print("init_db failed:", repr(e))
        # don't crash in Vercel
        if os.getenv("VERCEL") != "1":
            raise


@app.get("/ping")
def ping():
    return {"pong": True}
