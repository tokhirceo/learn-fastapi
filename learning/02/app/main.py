import mimetypes
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from config import settings
from database import Base, engine
from models.task import Task
from routers.task import router as task_router


# Windows'da .js fayllar noto'g'ri MIME bilan qaytmasligi uchun
mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("text/css", ".css")

BASE_DIR = Path(__file__).resolve().parent
FRONTEND_DIR = BASE_DIR / "frontend"
INDEX_FILE = FRONTEND_DIR / "index.html"


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title=settings.APP_NAME,
    debug=settings.DEBUG,
)


app.include_router(task_router)


@app.get("/", include_in_schema=False)
def home():
    return FileResponse(INDEX_FILE, media_type="text/html")


# Frontend fayllari (css/js modullar) — /static/... orqali
app.mount("/static", StaticFiles(directory=FRONTEND_DIR), name="static")