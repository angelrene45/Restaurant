from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.order import create_random_order, create_random_order_foods, select_random_order_status
from app.tests.utils.user import create_random_user
from app.tests.utils.customer import create_random_customer
from app.tests.utils.board import create_random_board
from app.tests.utils.food import create_random_food
from app.tests.utils.utils import random_boolean, random_float, random_lower_string, random_integer


def test_get_orders(
    client: TestClient, db: Session,
) -> None:
    create_random_order(db)
    create_random_order(db)
    r = client.get(f"{settings.API_V1_STR}/orders")
    all_orders = r.json()
    assert all_orders
    assert len(all_orders) > 1
    for order in all_orders:
        assert "grant_total" in order


def test_get_total_orders_on_db(
    client: TestClient, db: Session,
) -> None:
    create_random_order(db)
    create_random_order(db)
    r = client.get(f"{settings.API_V1_STR}/orders/count")
    count = r.json()
    assert count > 0


def test_get_existing_order(
    client: TestClient, db: Session,
) -> None:
    order = create_random_order(db)
    order_id = order.id
    r = client.get(f"{settings.API_V1_STR}/orders/{order_id}")
    order = r.json()
    assert order
    assert "grant_total" in order


def test_create_order(
    client: TestClient, db: Session
) -> None:
    # create user, customer and board
    user = create_random_user(db)
    customer = create_random_customer(db)
    board = create_random_board(db)
    # create random foods list
    foods = create_random_order_foods(db, n=3, as_dict=True) 
    data = {
        "user_id": user.id,
        "customer_id": customer.id,
        "board_id": board.id,
        "foods": foods,
        "note": random_lower_string(),
        "status": select_random_order_status(),
        "subtotal": random_float(),
        "tax": random_float(),
        "total": random_float(),
        "discount": random_integer(),
        "grant_total": random_float()
    }
    r = client.post(
        f"{settings.API_V1_STR}/orders/", json=data,
    )
    created_order = r.json()
    assert r.status_code == 200
    assert created_order
    assert created_order.get("grant_total") == data.get("grant_total")
    assert created_order.get("note") == data.get("note")
    assert len(created_order.get("foods")) == 3

    for food in created_order.get("foods"):
        assert "variant" in food
        assert "unit" in food
        assert "quantity" in food


def test_update_order(
    client: TestClient, db: Session
) -> None:
    order_created = create_random_order(db)
    order_id = order_created.id

    data = {
        "status": select_random_order_status(),
        "subtotal": random_float(),
        "tax": random_float(),
        "total": random_float(),
        "discount": random_integer(),
        "grant_total": random_float(),
        "foods": create_random_order_foods(db, n=1, as_dict=True) 
    }
    r = client.put(
        f"{settings.API_V1_STR}/orders/{order_id}", json=data,
    )
    order_updated = r.json()
    assert r.status_code == 200
    assert order_updated
    assert order_created.grant_total != order_updated.get("grant_total")
    assert order_updated.get("grant_total") == data.get("grant_total")
    assert len(order_updated.get("foods")) == 1