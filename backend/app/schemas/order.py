import json
from typing import Optional, List
from datetime import datetime

from pydantic import BaseModel

from app.models.order import StatusOrder

schema_example = {
    "example": {       
        "user_id": "<user_id>",
        "customer_id": "<customer_id>",
        "board_id": "<board_id>",
        "foods": [
            {
                "food_id": "<food_id>",
                "name": "<name of food>",
                "quantity": "<quantity of food>",
                "price": "<price of variant that choose user>",
            }
        ],
        "status": "<Constant of OrderStatus Schema>",
        "subtotal": "<sum of all prices>",
        "tax": "<tax>",
        "discount": "<discount rate>",
        "grant_total": "<subtotal + tax - discount",
    }
}


class OrderFood(BaseModel):
    food_id: Optional[int]
    name: Optional[str]
    quantity: Optional[int]
    price: Optional[float]

    class Config:
        orm_mode = True


# Order
class OrderBase(BaseModel):
    user_id: Optional[int] = None
    customer_id: Optional[int] = None
    board_id: Optional[int] = None
    foods: Optional[List[OrderFood]] = []
    status: Optional[StatusOrder] = None
    subtotal: Optional[float] = None
    tax: Optional[float] = None
    total: Optional[float] = None
    discount: Optional[int] = None
    grant_total: Optional[float] = None


# Properties to receive via API on creation
class OrderCreate(OrderBase):
    foods: Optional[List[OrderFood]] = []

    class Config:
        schema_extra = schema_example


# Properties to receive via API on update
class OrderUpdate(OrderBase):
    foods: Optional[List[OrderFood]] = []

    class Config:
        schema_extra = schema_example


class OrderInDBBase(OrderBase):
    id: int
    created_date: datetime
    updated_date: datetime

    class Config:
        orm_mode = True

# Additional properties to return via API
class Order(OrderInDBBase):
    pass


# Additional properties stored in DB
class OrderInDB(OrderInDBBase):
    pass