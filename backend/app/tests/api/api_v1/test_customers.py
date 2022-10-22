from typing import Dict

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import crud
from app.core.config import settings
from app.schemas.customer import CustomerCreate
from app.tests.utils.utils import random_email, random_lower_string
from app.tests.utils.customer import create_random_customer, random_list_addresses


def test_create_customer_being_admin(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:
    email = random_email()
    password = random_lower_string()
    addresses = random_list_addresses(n=2, as_dict=True)
    data = {"email": email, "password": password, "addresses": addresses}
    r = client.post(
        f"{settings.API_V1_STR}/customers/", headers=superuser_token_headers, json=data,
    )
    assert 200 <= r.status_code < 300
    created_customer = r.json()
    customer = crud.customer.get_by_email(db, email=email)
    assert customer
    assert customer.email == created_customer["email"]
    assert len(customer.addresses) == 2


def test_create_user_existing_email_being_admin(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = CustomerCreate(email=email, password=password)
    crud.customer.create(db, obj_in=user_in)
    data = {"email": email, "password": password}
    r = client.post(
        f"{settings.API_V1_STR}/customers/", headers=superuser_token_headers, json=data,
    )
    created_customer = r.json()
    assert r.status_code == 400
    assert "_id" not in created_customer


def test_create_customer_by_normal_user_in_admin_api(
    client: TestClient, normal_user_token_headers: Dict[str, str]
) -> None:
    email = random_email()
    password = random_lower_string()
    data = {"email": email, "password": password}
    r = client.post(
        f"{settings.API_V1_STR}/customers/", headers=normal_user_token_headers, json=data,
    )
    assert r.status_code == 400


def test_create_customer_open_api(
    client: TestClient, db: Session
) -> None:
    email = random_email()
    password = random_lower_string()
    addresses = random_list_addresses(n=2, as_dict=True)
    data = {"email": email, "password": password, "addresses": addresses}
    r = client.post(
        f"{settings.API_V1_STR}/customers/open", json=data,
    )
    assert 200 <= r.status_code < 300
    created_customer = r.json()
    customer = crud.customer.get_by_email(db, email=email)
    assert customer
    assert customer.email == created_customer["email"]
    assert len(customer.addresses) == 2  


def test_update_customer_being_admin(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:
    customer_created = create_random_customer(db)
    customer_id = customer_created.id
    new_email = random_email()
    new_password = random_lower_string()
    new_addresses = random_list_addresses(n=1, as_dict=True)
    data = {"email": new_email, "password": new_password, "addresses": new_addresses}
    r = client.put(
        f"{settings.API_V1_STR}/customers/{customer_id}", headers=superuser_token_headers, json=data,
    )
    assert r.status_code == 200
    updated_customer = r.json()
    assert updated_customer
    assert updated_customer["email"] == new_email
    assert updated_customer["email"] != customer_created.email
    assert len(updated_customer["addresses"]) == 1


def test_update_customer_me(
    client: TestClient, customer_token_headers: dict, db: Session
) -> None:
    new_email = random_email()
    new_password = random_lower_string()
    new_addresses = random_list_addresses(n=5, as_dict=True)
    data = {"email": new_email, "password": new_password, "addresses": new_addresses}
    r = client.put(
        f"{settings.API_V1_STR}/customers/me", headers=customer_token_headers, json=data,
    )
    customer = crud.customer.get_by_email(db, email=new_email)
    assert r.status_code == 200
    updated_customer = r.json()
    assert updated_customer
    assert updated_customer["email"] == customer.email
    assert len(updated_customer["addresses"]) == 5


def test_get_customers_me(
    client: TestClient, customer_token_headers: Dict[str, str]
) -> None:
    r = client.get(f"{settings.API_V1_STR}/customers/me", headers=customer_token_headers)
    current_customer = r.json()
    assert current_customer
    assert current_customer["is_active"] is True
    assert current_customer["email"]


def test_get_existing_customer(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = CustomerCreate(email=email, password=password)
    customer = crud.customer.create(db, obj_in=user_in)
    customer_id = customer.id
    r = client.get(
        f"{settings.API_V1_STR}/customers/{customer_id}", headers=superuser_token_headers,
    )
    assert 200 <= r.status_code < 300
    api_user = r.json()
    existing_user = crud.customer.get_by_email(db, email=email)
    assert existing_user
    assert existing_user.email == api_user["email"]


def test_retrieve_customers(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = CustomerCreate(email=email, password=password)
    crud.customer.create(db, obj_in=user_in)

    email2 = random_email()
    password2 = random_lower_string()
    user_in2 = CustomerCreate(email=email2, password=password2)
    crud.customer.create(db, obj_in=user_in2)

    r = client.get(f"{settings.API_V1_STR}/customers/", headers=superuser_token_headers)
    all_users = r.json()

    assert len(all_users) > 1
    for item in all_users:
        assert "email" in item
