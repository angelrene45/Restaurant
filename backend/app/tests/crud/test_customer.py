from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud
from app.core.security import verify_password
from app.schemas.customer import CustomerCreate, CustomerUpdate
from app.tests.utils.utils import random_email, random_lower_string
from app.tests.utils.customer import random_list_addresses


def test_create_customer(db: Session) -> None:
    first_name = random_lower_string()
    email = random_email()
    password = random_lower_string()
    addresses = random_list_addresses(n=3, as_dict=True)
    customer_in = CustomerCreate(email=email, password=password, addresses=addresses, first_name=first_name)
    customer = crud.customer.create(db, obj_in=customer_in)
    assert customer.email == email
    assert hasattr(customer, "hashed_password")
    assert len(customer.addresses) == 3


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
    customer_in = CustomerCreate(email=username, password=password)
    customer = crud.customer.create(db, obj_in=customer_in)
    customer_updated = crud.customer.get(db, id=customer.id)
    assert customer_updated
    assert customer.email == customer_updated.email
    assert jsonable_encoder(customer) == jsonable_encoder(customer_updated)


def test_update_customer(db: Session) -> None:
    password = random_lower_string()
    email = random_email()
    addresses = random_list_addresses(n=3, as_dict=True)
    customer_in = CustomerCreate(email=email, password=password, addresses=addresses)
    customer = crud.customer.create(db, obj_in=customer_in)
    new_password = random_lower_string()
    new_addresses = random_list_addresses(n=1, as_dict=True)
    customer_in_update = CustomerUpdate(password=new_password, addresses=new_addresses)
    crud.customer.update(db, db_obj=customer, obj_in=customer_in_update)
    customer_updated = crud.customer.get(db, id=customer.id)
    assert customer_updated
    assert customer.email == customer_updated.email
    assert verify_password(new_password, customer_updated.hashed_password)
    assert len(customer_updated.addresses) == 1