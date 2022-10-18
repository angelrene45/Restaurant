import json
from typing import Optional, List
from datetime import datetime

from pydantic import BaseModel

from app.schemas.category import Category


class FoodVariant(BaseModel):
    id: Optional[int]
    name: Optional[str]
    image: Optional[str]
    is_active: Optional[bool]

    class Config:
        orm_mode = True


class FoodUnit(BaseModel):
    id: Optional[int]
    unit: Optional[str]
    price: Optional[float]
    is_active: Optional[bool] = True

    class Config:
        orm_mode = True


class FoodCategory(BaseModel):
    id: Optional[int]


# Food
class FoodBase(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    variants: Optional[List[FoodVariant]] = []
    units: Optional[List[FoodUnit]] = []
    categories: Optional[List[Category]] = []
    discount: Optional[int] = None
    image: Optional[str] = None
    is_active: Optional[bool] = None


# Properties to receive via API on creation
class FoodCreate(FoodBase):
    discount: int = 0
    is_active: bool = True
    categories: List[FoodCategory] = []

    @classmethod
    def __get_validators__(cls):
        yield cls.validate_to_json

    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value


# Properties to receive via API on update
class FoodUpdate(FoodBase):
    discount: int = 0
    is_active: bool = True


class FoodInDBBase(FoodBase):
    id: int

    class Config:
        orm_mode = True

# Additional properties to return via API
class Food(FoodInDBBase):
    created_date: datetime
    updated_date: datetime


# Additional properties stored in DB
class FoodInDB(FoodInDBBase):
    pass