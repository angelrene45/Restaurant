from typing import Optional, List
from datetime import datetime

from pydantic import BaseModel, FilePath

from app.schemas.user import User
from app.schemas.category import Category

# Food History Price
class FoodPrice(BaseModel):
    price: float
    user_id: int
    # user: User
    user_name: Optional[str]
    created_date: datetime

    class Config:
        orm_mode = True

# Food
class FoodBase(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    categories: Optional[List[Category]] = []
    discount: Optional[int] = None
    image: Optional[FilePath] = None
    is_active: Optional[bool] = None


# Properties to receive via API on creation
class FoodCreate(FoodBase):
    discount: int = 0
    is_active: bool = True
    is_active: bool = True

# Properties to receive via API on update
class FoodUpdate(FoodBase):
    pass


class FoodInDBBase(FoodBase):
    id: int

    class Config:
        orm_mode = True

# Additional properties to return via API
class Food(FoodInDBBase):
    created_date: datetime
    updated_date: datetime
    history_price: List[FoodPrice]


# Additional properties stored in DB
class FoodInDB(FoodInDBBase):
    pass