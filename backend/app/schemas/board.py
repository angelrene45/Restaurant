from typing import Optional, List
from datetime import datetime

from pydantic import BaseModel

# Board
class BoardBase(BaseModel):
    name: Optional[str] = None
    layout_id: Optional[int] = None
    capacity: Optional[int] = 0
    can_smoke: Optional[bool] = False
    position: Optional[dict] = {}
    qr: Optional[str] = None


class BoardCreate(BoardBase):
    pass


class BoardUpdate(BoardBase):
    pass


class BoardInDBBase(BoardBase):
    id: int
    name: str

    class Config:
        orm_mode = True


class Board(BoardInDBBase):
    pass


class BoardInDB(BoardInDBBase):
    created_date: datetime
    updated_date: datetime
