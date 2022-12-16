"""
    Start the server:
        uvicorn main:app --reload
"""
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

from app.api.api_v1.api import api_router
from app.api.sockets_v1.api import socket_router
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME, openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# set all endpoints
app.include_router(api_router, prefix=settings.API_V1_STR)
# set all websocket
app.include_router(socket_router, prefix=settings.SOCKET_V1_STR)

# serving static files 
app.mount("/static", StaticFiles(directory="static"), name="static")


from fastapi import Depends
from sqlalchemy.orm import Session
from app.db.init_db import init_db
from app.api import deps

@app.get("/")
def get(db: Session = Depends(deps.get_db)):
    # create super user if dont exists
    init_db(db)
    return {"msg":"Database initialized"}

# Initialize async polling database connection
from app.db.session import database_async

@app.on_event("startup")
async def startup():
    await database_async.connect()

@app.on_event("shutdown")
async def shutdown():
    await database_async.disconnect()