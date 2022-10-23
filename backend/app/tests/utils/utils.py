import random
import string
from typing import Dict

from fastapi.testclient import TestClient

from app.core.config import settings


def random_boolean() -> bool:
    return random.choices([True, False])[0]


def random_lower_string() -> str:
    return "".join(random.choices(string.ascii_lowercase, k=32))


def random_integer() -> int:
    return random.randint(0, 100)


def random_float() -> float:
    return round(random.uniform(0, 200), 2)


def random_email() -> str:
    return f"{random_lower_string()}@{random_lower_string()}.com"


def random_dict() -> dict:
    return dict.fromkeys(range(50), "value test")
    

def get_superuser_token_headers(client: TestClient) -> Dict[str, str]:
    login_data = {
        "username": settings.FIRST_SUPERUSER,
        "password": settings.FIRST_SUPERUSER_PASSWORD,
    }
    r = client.post(f"{settings.API_V1_STR}/login/access-token", data=login_data)
    tokens = r.json()
    a_token = tokens["access_token"]
    headers = {"Authorization": f"Bearer {a_token}"}
    return headers
