from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.utils import random_lower_string
from app.tests.utils.layout import create_random_layout


def test_get_layouts(
    client: TestClient, db: Session, normal_user_token_headers: dict
) -> None:
    create_random_layout(db)
    create_random_layout(db)
    r = client.get(f"{settings.API_V1_STR}/layouts", headers=normal_user_token_headers)
    all_layouts = r.json()
    assert all_layouts
    assert len(all_layouts) > 1
    for layout in all_layouts:
        assert "name" in layout


def test_get_existing_layout(
    client: TestClient, db: Session, normal_user_token_headers: dict
) -> None:
    layout = create_random_layout(db)
    layout_id = layout.id
    r = client.get(f"{settings.API_V1_STR}/layouts/{layout_id}", headers=normal_user_token_headers)
    layout = r.json()
    assert layout
    assert "name" in layout


def test_create_layouts(
    client: TestClient, normal_user_token_headers: dict, db: Session
) -> None:

    data = {"name": random_lower_string()}
    r = client.post(
        f"{settings.API_V1_STR}/layouts/", headers=normal_user_token_headers, json=data,
    )
    created_layout = r.json()
    assert r.status_code == 200
    assert created_layout
    assert created_layout.get("name") == data.get("name")


def test_create_layout_existing_name(
    client: TestClient, normal_user_token_headers: dict, db: Session
) -> None:
    layout_created = create_random_layout(db)

    data = {"name": layout_created.name}
    r = client.post(
        f"{settings.API_V1_STR}/layouts/", headers=normal_user_token_headers, json=data,
    )
    assert r.status_code == 400


def test_update_layout(
    client: TestClient, normal_user_token_headers: dict, db: Session
) -> None:
    layout_created = create_random_layout(db)
    layout_id = layout_created.id

    data = {"name": random_lower_string()}
    r = client.put(
        f"{settings.API_V1_STR}/layouts/{layout_id}", headers=normal_user_token_headers, json=data,
    )
    layout_updated = r.json()
    assert r.status_code == 200
    assert layout_updated
    assert layout_created.name != layout_updated.get("name")
    assert layout_updated.get("name") == data.get("name")


def test_update_layout_with_name_already_exist(
    client: TestClient, normal_user_token_headers: dict, db: Session
) -> None:
    layout_1 = create_random_layout(db)
    layout_2 = create_random_layout(db)
    layout_id = layout_2.id

    data = {"name": layout_1.name}
    r = client.put(
        f"{settings.API_V1_STR}/layouts/{layout_id}", headers=normal_user_token_headers, json=data,
    )
    assert r.status_code == 400 # the layout name already exists in the system