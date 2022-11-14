from fastapi import APIRouter

from app.api.sockets_v1.endpoints import orders

socket_router = APIRouter()
socket_router.include_router(orders.router, prefix="/orders", tags=["orders"])