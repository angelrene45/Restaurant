from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.utils import random_lower_string
from app.tests.utils.board import create_random_board


def test_create_boards(
    client: TestClient, normal_user_token_headers: dict
) -> None:

    data = {"name": random_lower_string()}
    r = client.post(
        f"{settings.API_V1_STR}/boards/", headers=normal_user_token_headers, json=data,
    )
    created_board = r.json()
    assert r.status_code == 200
    assert created_board
    assert created_board.get("name") == data.get("name")
    assert "static/test" in created_board.get("qr")


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

    data = {"name": random_lower_string()}
    r = client.put(
        f"{settings.API_V1_STR}/boards/{board_id}", headers=normal_user_token_headers, json=data,
    )
    board_updated = r.json()
    assert r.status_code == 200
    assert board_updated
    assert board_created.name != board_updated.get("name")
    assert board_updated.get("name") == data.get("name")

