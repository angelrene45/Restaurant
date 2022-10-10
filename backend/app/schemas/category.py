from typing import Optional, List
from datetime import datetime

from pydantic import BaseModel

# Category
class CategoryBase(BaseModel):
    name: Optional[str] = None

# Properties to receive via API on creation
class CategoryCreate(CategoryBase):
    pass

# Properties to receive via API on update
class CategoryUpdate(CategoryBase):
    pass


class CategoryInDBBase(CategoryBase):
    id: int
    name: str

    class Config:
        orm_mode = True

# Additional properties to return via API
class Category(CategoryInDBBase):
    pass


# Additional properties stored in DB
class CategoryInDB(CategoryInDBBase):
    created_date: datetime
    updated_date: datetime