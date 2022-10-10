from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud
from app.schemas.category import CategoryCreate, CategoryUpdate
from app.tests.utils.utils import random_lower_string


def test_create_category(db: Session) -> None:
    name = random_lower_string()
    category_in = CategoryCreate(name=name)
    category = crud.category.create(db, obj_in=category_in)
    assert category.name == name


def test_update_category(db: Session) -> None:
    name = random_lower_string()
    category_in = CategoryCreate(name=name)
    category = crud.category.create(db, obj_in=category_in)
    new_name = random_lower_string()
    category_in_update = CategoryUpdate(name=new_name)
    crud.category.update(db, db_obj=category, obj_in=category_in_update)
    category_2 = crud.category.get(db, id=category.id)
    assert category_2
    assert category.name == category_2.name


def test_get_category(db: Session) -> None:
    name = random_lower_string()
    category_in = CategoryCreate(name=name)
    category = crud.category.create(db, obj_in=category_in)
    category_2 = crud.category.get(db, id=category.id)
    assert category_2
    assert category.name == category_2.name
    assert jsonable_encoder(category) == jsonable_encoder(category_2)


def test_get_multi_category(db: Session) -> None:
    categories_created = [crud.category.create(db, obj_in=CategoryCreate(name=random_lower_string())) for _ in range(10)]
    categories_db = crud.category.get_multi(db)
    assert categories_db
    assert len(categories_db) >= len(categories_created)