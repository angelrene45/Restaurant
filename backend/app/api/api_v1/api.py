from fastapi import APIRouter

from app.api.api_v1.endpoints import utils, login, users, customers, categories, foods, layouts, boards, orders, payments, settings

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(customers.router, prefix="/customers", tags=["customers"])
api_router.include_router(categories.router, prefix="/categories", tags=["categories"])
api_router.include_router(foods.router, prefix="/foods", tags=["foods"])
api_router.include_router(layouts.router, prefix="/layouts", tags=["layouts"])
api_router.include_router(boards.router, prefix="/boards", tags=["boards"])
api_router.include_router(orders.router, prefix="/orders", tags=["orders"])
api_router.include_router(payments.router, prefix="/payments", tags=["payments"])
api_router.include_router(settings.router, prefix="/settings", tags=["settings"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])