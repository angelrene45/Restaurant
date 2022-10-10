from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import crud
from app.core.config import settings
from app.schemas.food import FoodCreate
from app.tests.utils.utils import random_lower_string, random_float, random_integer
from app.tests.utils.food import create_random_food
from app.tests.utils.category import create_random_category


def test_get_foods_open(
    client: TestClient, db: Session
) -> None:
    create_random_food(db)
    create_random_food(db)
    r = client.get(f"{settings.API_V1_STR}/foods/open")
    all_foods = r.json()
    assert all_foods
    assert len(all_foods) > 1
    for food in all_foods:
        assert "name" in food
        assert "description" in food
        assert "price" in food
        assert "is_active" in food
        assert food.get("is_active") is True
        assert isinstance(food.get("categories"), list)


def test_get_existing_food_open(
    client: TestClient, db: Session
) -> None:
    food = create_random_food(db)
    food_id = food.id
    r = client.get(f"{settings.API_V1_STR}/foods/open/{food_id}")
    food = r.json()
    assert food
    assert "name" in food
    assert "description" in food
    assert "price" in food
    assert "is_active" in food
    assert food.get("is_active") is True
    assert isinstance(food.get("categories"), list)


def test_create_foods_being_admin(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:
    category_1 = create_random_category(db)
    category_2 = create_random_category(db)
    category_3 = create_random_category(db)
    data = {
        "name": random_lower_string(),
        "description": random_lower_string() ,
        "price": random_float(),
        "discount": random_integer(),
        "categories": [category_1.id, category_2.id, category_3.id],
        "image": None,
        "is_active": True,
    }
    r = client.post(
        f"{settings.API_V1_STR}/foods/", headers=superuser_token_headers, data=data,
    )
    created_food = r.json()
    assert r.status_code == 200
    assert created_food
    assert created_food.get("is_active") == True
    assert created_food.get("name") == data.get("name")
    assert len(created_food.get("categories")) == 3


def test_update_food_being_admin(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:
    food_created = create_random_food(db)
    food_id = food_created.id
    category_1 = create_random_category(db)
    category_2 = create_random_category(db)
    category_3 = create_random_category(db)
    data = {
        "name": random_lower_string(),
        "description": random_lower_string() ,
        "price": random_float(),
        "discount": random_integer(),
        "categories": [category_1.id, category_2.id, category_3.id],
        "image": None,
        "is_active": False,
    }
    r = client.put(
        f"{settings.API_V1_STR}/foods/{food_id}", headers=superuser_token_headers, data=data,
    )
    food_updated = r.json()
    assert r.status_code == 200
    assert food_updated
    assert food_updated.get("is_active") == False
    assert food_updated.get("name") == data.get("name")
    assert len(food_updated.get("categories")) == 3
    assert len(food_updated.get("history_price")) >= 1

