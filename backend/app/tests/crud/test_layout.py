from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud
from app.schemas.layout import LayoutCreate, LayoutUpdate
from app.tests.utils.utils import random_lower_string, random_boolean, random_dict


def test_create_layout(db: Session) -> None:
    name = random_lower_string()
    items = random_dict()
    layout_in = LayoutCreate(name=name, items=items)
    layout = crud.layout.create(db, obj_in=layout_in)
    assert layout.name == name


def test_update_layout(db: Session) -> None:
    name = random_lower_string()
    items = random_dict()
    layout_in = LayoutCreate(name=name, items=items)
    layout = crud.layout.create(db, obj_in=layout_in)
    new_name = random_lower_string()
    layout_in_update = LayoutUpdate(name=new_name)
    crud.layout.update(db, db_obj=layout, obj_in=layout_in_update)
    layout_2 = crud.layout.get(db, id=layout.id)
    assert layout_2
    assert layout.name == layout_2.name


def test_get_layout(db: Session) -> None:
    name = random_lower_string()
    layout_in = LayoutCreate(name=name)
    layout = crud.layout.create(db, obj_in=layout_in)
    layout_2 = crud.layout.get(db, id=layout.id)
    assert layout_2
    assert layout.name == layout_2.name
    assert jsonable_encoder(layout) == jsonable_encoder(layout_2)


def test_get_multi_layout(db: Session) -> None:
    categories_created = [crud.layout.create(db, obj_in=LayoutCreate(name=random_lower_string())) for _ in range(10)]
    categories_db = crud.layout.get_multi(db)
    assert categories_db
    assert len(categories_db) >= len(categories_created)