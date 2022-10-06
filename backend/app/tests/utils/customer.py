from typing import Dict

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import crud
from app import schemas
from app.core.config import settings
from app.schemas.customer import CustomerCreate
from app.tests.utils.utils import random_email, random_lower_string


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
    email = random_email()
    password = random_lower_string()
    customer_in_create = CustomerCreate(username=email, email=email, password=password)
    crud.customer.create(db, obj_in=customer_in_create)

    return customer_authentication_headers(client=client, email=email, password=password)
