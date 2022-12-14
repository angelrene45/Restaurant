import json
from typing import Optional, List
from datetime import datetime

from pydantic import BaseModel

from app.schemas.category import Category, CategoryBase

schema_example = {
    "example": {
        "name": "Shrimp Cocktail",
        "description": "Served with hot shrimp juice",
        "variants": [{"name": "variant cocktail 1", "image": "<name-of-image-that-upload>"}, {"name": "variant cocktail 2", "image": "<name-of-image-that-upload>"}],
        "units": [{"unit":"Sm", "price": 15.99}, {"unit": "Lg", "price": 20.98}],
        "categories": [{"id": 1}],
        "discount": 0,
        "is_active": True
    }
}


class FoodVariant(BaseModel):
    name: Optional[str]
    image: Optional[str]
    is_active: Optional[bool]

    class Config:
        orm_mode = True


class FoodUnit(BaseModel):
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

    class Config:
        schema_extra = schema_example


# Properties to receive via API on update
class FoodUpdate(FoodBase):
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

    class Config:
        schema_extra = schema_example


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


# Request categories with foods (Using here because we want to avoid circular import error)
class CategoryWithFoods(CategoryBase):
    foods: List[Food]

    class Config:
        # is necessary when try to convert sql alchemy to pydantic model
        orm_mode = True