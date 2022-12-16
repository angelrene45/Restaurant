from typing import Dict

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import crud, schemas
from app.core.config import settings
from app.schemas import CustomerCreate
from app.tests.utils.utils import random_email, random_lower_string


def test_get_access_token_user(client: TestClient) -> None:
    login_data = {
        "username": settings.FIRST_SUPERUSER,
        "password": settings.FIRST_SUPERUSER_PASSWORD,
        "user_type": "user",
    }
    r = client.post(f"{settings.API_V1_STR}/login/access-token", data=login_data)
    tokens = r.json()
    assert r.status_code == 200
    assert "access_token" in tokens
    assert tokens["access_token"]

def test_get_access_token_customer(client: TestClient, db: Session) -> None:
    username = random_email()
    password = random_lower_string()
    customer_in = CustomerCreate(email=username, password=password)
    crud.customer.create(db, obj_in=customer_in)
    login_data = {
        "username": username,
        "password": password,
        "user_type": "customer",
    }
    r = client.post(f"{settings.API_V1_STR}/login/access-token", data=login_data)
    tokens = r.json()
    assert r.status_code == 200
    assert "access_token" in tokens
    assert tokens["access_token"]

def test_use_access_token(
    client: TestClient, superuser_token_headers: Dict[str, str]
) -> None:
    r = client.post(
        f"{settings.API_V1_STR}/login/test-token", headers=superuser_token_headers,
    )
    result = r.json()
    assert r.status_code == 200
    assert "email" in result

def test_refresh_access_token(
    client: TestClient, superuser_token_headers: Dict[str, str]
) -> None:
    token = superuser_token_headers.get('Authorization')
    token = token.replace("Bearer ", "")
    json = {
        "token": token, 
        "user_type": schemas.UserTypeEnum.user.value
    }
    r = client.post(
        f"{settings.API_V1_STR}/login/refresh-token", json=json
    )
    result = r.json()
    assert r.status_code == 200
    assert "access_token" in result