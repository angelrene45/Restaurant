from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud
from app.core.security import verify_password
from app.schemas.customer import CustomerCreate, CustomerUpdate
from app.tests.utils.utils import random_email, random_lower_string


def test_create_customer(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    customer_in = CustomerCreate(email=email, password=password)
    customer = crud.customer.create(db, obj_in=customer_in)
    assert customer.email == email
    assert hasattr(customer, "hashed_password")


def test_authenticate_customer(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    customer_in = CustomerCreate(email=email, password=password)
    customer = crud.customer.create(db, obj_in=customer_in)
    authenticated_customer = crud.customer.authenticate(db, email=email, password=password)
    assert authenticated_customer
    assert customer.email == authenticated_customer.email


def test_not_authenticate_customer(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    customer = crud.customer.authenticate(db, email=email, password=password)
    assert customer is None


def test_check_if_customer_is_active(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    customer_in = CustomerCreate(email=email, password=password)
    customer = crud.customer.create(db, obj_in=customer_in)
    is_active = crud.customer.is_active(customer)
    assert is_active is True


def test_check_if_customer_is_inactive(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    customer_in = CustomerCreate(email=email, password=password, is_active=False)
    customer = crud.customer.create(db, obj_in=customer_in)
    is_active = crud.customer.is_active(customer)
    assert is_active is False


def test_get_customer(db: Session) -> None:
    password = random_lower_string()
    username = random_email()
    customer_in = CustomerCreate(email=username, password=password, is_admin=True)
    customer = crud.customer.create(db, obj_in=customer_in)
    customer_2 = crud.customer.get(db, id=customer.id)
    assert customer_2
    assert customer.email == customer_2.email
    assert jsonable_encoder(customer) == jsonable_encoder(customer_2)


def test_update_customer(db: Session) -> None:
    password = random_lower_string()
    email = random_email()
    customer_in = CustomerCreate(email=email, password=password, is_admin=True)
    customer = crud.customer.create(db, obj_in=customer_in)
    new_password = random_lower_string()
    customer_in_update = CustomerUpdate(password=new_password, is_admin=True)
    crud.customer.update(db, db_obj=customer, obj_in=customer_in_update)
    customer_2 = crud.customer.get(db, id=customer.id)
    assert customer_2
    assert customer.email == customer_2.email
    assert verify_password(new_password, customer_2.hashed_password)
