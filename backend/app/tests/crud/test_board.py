from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud
from app.schemas.board import BoardCreate, BoardUpdate
from app.tests.utils.utils import random_lower_string, random_boolean, random_dict
from app.tests.utils.layout import create_random_layout


def test_create_board(db: Session) -> None:
    name = random_lower_string()
    can_smoke = random_boolean()
    position = random_dict()
    layout = create_random_layout(db)
    board_in = BoardCreate(name=name, layout_id=layout.id, can_smoke=can_smoke, position=position)
    board = crud.board.create(db, obj_in=board_in)
    assert board.name == name


def test_update_board(db: Session) -> None:
    name = random_lower_string()
    can_smoke = random_boolean()
    position = random_dict()
    layout = create_random_layout(db)
    board_in = BoardCreate(name=name, layout_id=layout.id, can_smoke=can_smoke, position=position)
    board = crud.board.create(db, obj_in=board_in)
    new_name = random_lower_string()
    board_in_update = BoardUpdate(name=new_name)
    crud.board.update(db, db_obj=board, obj_in=board_in_update)
    board_2 = crud.board.get(db, id=board.id)
    assert board_2
    assert board.name == board_2.name


def test_get_board(db: Session) -> None:
    name = random_lower_string()
    board_in = BoardCreate(name=name)
    board = crud.board.create(db, obj_in=board_in)
    board_2 = crud.board.get(db, id=board.id)
    assert board_2
    assert board.name == board_2.name
    assert jsonable_encoder(board) == jsonable_encoder(board_2)


def test_get_multi_board(db: Session) -> None:
    categories_created = [crud.board.create(db, obj_in=BoardCreate(name=random_lower_string())) for _ in range(10)]
    categories_db = crud.board.get_multi(db)
    assert categories_db
    assert len(categories_db) >= len(categories_created)