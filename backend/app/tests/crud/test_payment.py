from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud
from app.models.payment import StatusPayment, TypePayment
from app.schemas.payment import PaymentCreate, PaymentUpdate
from app.tests.utils.utils import random_lower_string, random_float
from app.tests.utils.order import create_random_order


def test_create_payment(db: Session) -> None:
    order = create_random_order(db)

    payment_in = PaymentCreate(
        payment_id = "4545456465456",
        order_id = order.id,
        customer_id = None,
        user_id = None,
        type_cart = TypePayment.debit_cart,
        status = StatusPayment.success,
        currency = "USD",
        amount = random_float()
    )
    payment = crud.payment.create(db, obj_in=payment_in)

    assert payment
    assert payment.order_id == order.id
    assert payment.status.value == StatusPayment.success
    assert payment.type_cart.value == TypePayment.debit_cart


def test_update_payment(db: Session) -> None:
    pass
    # name = random_lower_string()
    # payment_in = PaymentCreate(name=name)
    # payment = crud.payment.create(db, obj_in=payment_in)
    # new_name = random_lower_string()
    # payment_in_update = PaymentUpdate(name=new_name)
    # crud.payment.update(db, db_obj=payment, obj_in=payment_in_update)
    # payment_2 = crud.payment.get(db, id=payment.id)
    # assert payment_2
    # assert payment.name == payment_2.name


def test_get_payment(db: Session) -> None:
    pass
    # name = random_lower_string()
    # payment_in = PaymentCreate(name=name)
    # payment = crud.payment.create(db, obj_in=payment_in)
    # payment_2 = crud.payment.get(db, id=payment.id)
    # assert payment_2
    # assert payment.name == payment_2.name
    # assert jsonable_encoder(payment) == jsonable_encoder(payment_2)


def test_get_multi_payment(db: Session) -> None:
    pass
    # categories_created = [crud.payment.create(db, obj_in=PaymentCreate(name=random_lower_string())) for _ in range(10)]
    # categories_db = crud.payment.get_multi(db)
    # assert categories_db
    # assert len(categories_db) >= len(categories_created)