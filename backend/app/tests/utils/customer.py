from typing import Dict, List

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import crud
from app import schemas
from app import models
from app.core.config import settings
from app.schemas.customer import CustomerCreate, CustomerAddress
from app.tests.utils.utils import random_email, random_integer, random_lower_string


def customer_authentication_headers(
    *, client: TestClient, email: str, password: str
) -> Dict[str, str]:
    """
    Return headers with customer token
    """
    data = {"username": email, "password": password, "user_type": schemas.UserTypeEnum.customer}
    r = client.post(f"{settings.API_V1_STR}/login/access-token", data=data)
    response = r.json()
    auth_token = response["access_token"]
    headers = {"Authorization": f"Bearer {auth_token}"}
    return headers


def get_customer_token_headers(
    *, client: TestClient, db: Session
) -> Dict[str, str]:
    """
    Return a valid token for the customer

    Customer it is created first.
    """
    first_name = random_lower_string()
    email = random_email()
    password = random_lower_string()
    customer_in_create = CustomerCreate(first_name=first_name, email=email, password=password)
    crud.customer.create(db, obj_in=customer_in_create)
    return customer_authentication_headers(client=client, email=email, password=password)


def create_random_customer(db: Session) -> models.Customer:
    addresses = random_list_addresses(as_dict=True)
    customer_in = CustomerCreate(first_name = random_lower_string(),
                        email = random_email(),
                        password = random_lower_string(),
                        addresses= addresses,
                        is_active = True)
    return crud.customer.create(db=db, obj_in=customer_in)


def random_list_addresses(n=3, as_dict=False) -> List:
    """
    Return a list of random addresses

    send number of address that will be generated
    """
    if as_dict:
        return [CustomerAddress(street=random_lower_string(), city="New York", state="NY", country="USA", postal_code=random_integer(), location={}).dict() for _ in range(n)]
    else:
        return [CustomerAddress(street=random_lower_string(), city="New York", state="NY", country="USA", postal_code=random_integer(), location={}) for _ in range(n)]
