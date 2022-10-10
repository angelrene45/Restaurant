from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.utils import random_lower_string
from app.tests.utils.category import create_random_category


def test_get_categories_open(
    client: TestClient, db: Session
) -> None:
    create_random_category(db)
    create_random_category(db)
    r = client.get(f"{settings.API_V1_STR}/categories/open")
    all_categories = r.json()
    assert all_categories
    assert len(all_categories) > 1
    for category in all_categories:
        assert "name" in category


def test_get_existing_category_open(
    client: TestClient, db: Session
) -> None:
    category = create_random_category(db)
    category_id = category.id
    r = client.get(f"{settings.API_V1_STR}/categories/open/{category_id}")
    category = r.json()
    assert category
    assert "name" in category


def test_create_categories_being_admin(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:

    data = {"name": random_lower_string()}
    r = client.post(
        f"{settings.API_V1_STR}/categories/", headers=superuser_token_headers, json=data,
    )
    created_category = r.json()
    assert r.status_code == 200
    assert created_category
    assert created_category.get("name") == data.get("name")


def test_create_category_existing_name(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:
    category_created = create_random_category(db)

    data = {"name": category_created.name}
    r = client.post(
        f"{settings.API_V1_STR}/categories/", headers=superuser_token_headers, json=data,
    )
    assert r.status_code == 400


def test_update_category_being_admin(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:
    category_created = create_random_category(db)
    category_id = category_created.id

    data = {"name": random_lower_string()}
    r = client.put(
        f"{settings.API_V1_STR}/categories/{category_id}", headers=superuser_token_headers, json=data,
    )
    category_updated = r.json()
    assert r.status_code == 200
    assert category_updated
    assert category_created.name != category_updated.get("name")
    assert category_updated.get("name") == data.get("name")

