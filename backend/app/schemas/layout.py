from typing import Optional, List
from datetime import datetime

from pydantic import BaseModel

from app.schemas.board import Board


# Layout
class LayoutBase(BaseModel):
    name: Optional[str]
    items: Optional[dict]


class LayoutCreate(LayoutBase):
    pass


class LayoutUpdate(LayoutBase):
    pass


class LayoutInDBBase(LayoutBase):
    id: int
    name: str

    class Config:
        orm_mode = True


class Layout(LayoutInDBBase):
    boards: Optional[List[Board]]
