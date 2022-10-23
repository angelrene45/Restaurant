from typing import Optional

from sqlalchemy.orm import Session

from app import crud, models
from app.schemas.board import BoardCreate
from app.tests.utils.utils import random_lower_string, random_dict, random_boolean
from app.tests.utils.layout import create_random_layout


def create_random_board(db: Session) -> models.Board:
    name = random_lower_string()
    can_smoke = random_boolean()
    position = random_dict()
    layout = create_random_layout(db)
    board_in = BoardCreate(name=name, layout_id=layout.id, can_smoke=can_smoke, position=position)
    return crud.board.create(db=db, obj_in=board_in)