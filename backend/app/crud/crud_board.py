from typing import Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.board import Board
from app.schemas.board import BoardCreate, BoardUpdate


class CRUDBoard(CRUDBase[Board, BoardCreate, BoardUpdate]):
    def get_by_name(self, db: Session, *, name: str) -> Optional[Board]:
        return db.query(Board).filter(Board.name == name).first()

board = CRUDBoard(Board)