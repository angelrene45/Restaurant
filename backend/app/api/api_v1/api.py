from fastapi import APIRouter

from app.api.api_v1.endpoints import login, users, customers, utils

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(customers.router, prefix="/customers", tags=["customers"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])