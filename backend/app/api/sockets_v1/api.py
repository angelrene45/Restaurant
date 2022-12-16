from fastapi import APIRouter

from app.api.sockets_v1.endpoints import orders, boards

socket_router = APIRouter()
socket_router.include_router(orders.router, prefix="/orders", tags=["orders"])
socket_router.include_router(boards.router, prefix="/boards", tags=["boards"])