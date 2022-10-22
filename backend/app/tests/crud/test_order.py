from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud
from app.schemas.order import OrderUpdate
from app.tests.utils.utils import random_float
from app.tests.utils.order import create_random_order, create_random_order_foods, select_random_order_status


def test_create_order(db: Session) -> None:
    order = create_random_order(db, n_foods=6)
    assert order
    assert len(order.foods) == 6


def test_update_order(db: Session) -> None:
    # new data
    new_foods = create_random_order_foods(db, n=2, as_dict=True)
    new_status = select_random_order_status()
    new_tax = random_float()
    # create order with six foods
    order_created = create_random_order(db, n_foods=6)
    # update order
    order_in_update = OrderUpdate(foods=new_foods, status=new_status, tax=new_tax)
    crud.order.update(db, db_obj=order_created, obj_in=order_in_update)
    order_2 = crud.order.get(db, id=order_created.id)
    assert order_2
    assert order_2.status == new_status
    assert float(order_2.tax) == float(new_tax)
    assert len(order_created.foods) == 2


def test_get_order(db: Session) -> None:
    order = create_random_order(db)
    order_2 = crud.order.get(db, id=order.id)
    assert order_2
    assert order.total == order_2.total
    assert len(order.foods) == len(order_2.foods)
    assert jsonable_encoder(order) == jsonable_encoder(order_2)


def test_get_multi_order(db: Session) -> None:
    order_created = [create_random_order(db) for _ in range(3)]
    order_db = crud.order.get_multi(db)
    assert order_db
    assert len(order_db) >= len(order_created)