from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.utils import random_boolean, random_integer, random_lower_string
from app.tests.utils.board import create_random_board
from app.tests.utils.layout import create_random_layout


def test_create_boards(
    client: TestClient, normal_user_token_headers: dict, db: Session
) -> None:
    layout = create_random_layout(db)
    data = {
        "name": random_lower_string(),
        "layout_id": layout.id, 
        "capacity": random_integer(),
        "can_smoke": random_boolean() 
    }
    r = client.post(
        f"{settings.API_V1_STR}/boards/", headers=normal_user_token_headers, json=data,
    )
    created_board = r.json()
    assert r.status_code == 200
    assert created_board
    assert created_board.get("name") == data.get("name")
    assert created_board.get("capacity") == data.get("capacity")
    assert created_board.get("can_smoke") == data.get("can_smoke")
    assert "static/test" in created_board.get("qr") # check if exists qr code image


def test_create_with_bad_layout_boards(
    client: TestClient, normal_user_token_headers: dict
) -> None:
    data = {
        "name": random_lower_string(),
        "layout_id": 0, 
        "capacity": random_integer(),
        "can_smoke": random_boolean() 
    }
    r = client.post(
        f"{settings.API_V1_STR}/boards/", headers=normal_user_token_headers, json=data,
    )
    assert r.status_code == 400


def test_get_boards(
    client: TestClient, normal_user_token_headers: dict, db: Session
) -> None:
    create_random_board(db)
    create_random_board(db)
    r = client.get(f"{settings.API_V1_STR}/boards/", headers=normal_user_token_headers)
    all_boards = r.json()
    assert all_boards
    assert len(all_boards) > 1
    for board in all_boards:
        assert "name" in board
        assert "qr" in board


def test_get_existing_board(
    client: TestClient, normal_user_token_headers: dict, db: Session
) -> None:
    board = create_random_board(db)
    board_id = board.id
    r = client.get(f"{settings.API_V1_STR}/boards/{board_id}", headers=normal_user_token_headers)
    board = r.json()
    assert board
    assert "name" in board
    assert "qr" in board


def test_create_board_existing_name(
    client: TestClient, normal_user_token_headers: dict, db: Session
) -> None:
    board_created = create_random_board(db)

    data = {"name": board_created.name}
    r = client.post(
        f"{settings.API_V1_STR}/boards/", headers=normal_user_token_headers, json=data,
    )
    assert r.status_code == 400


def test_update_board(
    client: TestClient, normal_user_token_headers: dict, db: Session
) -> None:
    board_created = create_random_board(db)
    board_id = board_created.id
    data = {
        "name": random_lower_string(),
        "layout_id": board_created.layout_id, 
        "capacity": random_integer(),
        "can_smoke": random_boolean() 
    }
    r = client.put(
        f"{settings.API_V1_STR}/boards/{board_id}", headers=normal_user_token_headers, json=data,
    )
    board_updated = r.json()
    assert r.status_code == 200
    assert board_updated
    assert board_updated.get("name") == data.get("name")
    assert board_updated.get("capacity") == data.get("capacity")
    assert board_updated.get("can_smoke") == data.get("can_smoke")


def test_update_with_bad_layout_boards(
    client: TestClient, normal_user_token_headers: dict, db: Session
) -> None:
    board_created = create_random_board(db)
    board_id = board_created.id
    data = {
        "name": random_lower_string(),
        "layout_id": 0, 
        "capacity": random_integer(),
        "can_smoke": random_boolean() 
    }
    r = client.put(
        f"{settings.API_V1_STR}/boards/{board_id}", headers=normal_user_token_headers, json=data,
    )
    assert r.status_code == 400


def test_crud_boards_multi(
    client: TestClient, normal_user_token_headers: dict, db: Session
) -> None:
    layout = create_random_layout(db)
    board_created_list = [create_random_board(db) for _ in range(4)]
    data_update = [{ "id": board.id, "name": random_lower_string(), "layout_id": layout.id,  "capacity": random_integer(), "can_smoke": random_boolean() } for board in board_created_list]
    data_create = [{ "name": random_lower_string(), "layout_id": layout.id,  "capacity": random_integer(), "can_smoke": random_boolean() } for _ in range(4)]
    data = data_create + data_update
    r = client.post(
        f"{settings.API_V1_STR}/boards/multi/", headers=normal_user_token_headers, json=data,
    )
    result_list = r.json()
    assert r.status_code == 200
    assert len(result_list) == len(data)
    for board in result_list:
        assert board
        assert "name" in board
        assert "capacity" in board
        assert "can_smoke" in board

