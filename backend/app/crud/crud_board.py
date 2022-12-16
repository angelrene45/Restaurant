from typing import Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.board import Board
from app.schemas.board import BoardCreate, BoardUpdate


class CRUDBoard(CRUDBase[Board, BoardCreate, BoardUpdate]):
    def get_by_name(self, db: Session, *, name: str) -> Optional[Board]:
        return db.query(Board).filter(Board.name == name).first()

    def delete_not_in_list(self, db: Session, *, board_in_list: list[BoardUpdate]) -> Optional[Board]:
        id_boards = [board.id for board in board_in_list]
        # check boards that aren't in the list 
        list_boards = db.query(Board).filter(Board.id.not_in(id_boards)).all()
        # delete boards that aren't in the list 
        for obj in list_boards:
            db.delete(obj)
            db.commit()

board = CRUDBoard(Board)