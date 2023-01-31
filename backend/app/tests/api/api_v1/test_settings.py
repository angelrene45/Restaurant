from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.utils import random_lower_string
from app.tests.utils.setting import create_random_setting
from app.tests.utils.food import create_random_food


def test_get_settings_open(
    client: TestClient, db: Session
) -> None:
    create_random_setting(db)
    create_random_setting(db)
    r = client.get(f"{settings.API_V1_STR}/settings/open")
    all_settings = r.json()
    assert all_settings
    assert len(all_settings) > 1
    for setting in all_settings:
        assert "name" in setting


def test_create_settings_being_admin(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:

    data = {"name": random_lower_string(), "value": {}}
    r = client.post(
        f"{settings.API_V1_STR}/settings/", headers=superuser_token_headers, json=data,
    )
    created_setting = r.json()
    assert r.status_code == 200
    assert created_setting
    assert created_setting.get("name") == data.get("name")


def test_get_setting_by_name(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:
    setting = create_random_setting(db)
    r = client.get(
        f"{settings.API_V1_STR}/settings/open/{setting.name}", headers=superuser_token_headers
    )
    created_setting = r.json()
    assert r.status_code == 200
    assert created_setting
    assert created_setting.get("name") == setting.name


def test_create_settings_being_normal_user(
    client: TestClient, customer_token_headers: dict, db: Session
) -> None:

    data = {"name": random_lower_string(), "value": {}}
    r = client.post(
        f"{settings.API_V1_STR}/settings/", headers=customer_token_headers, json=data,
    )
    assert r.status_code == 400


def test_create_setting_existing_name(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:
    setting_created = create_random_setting(db)

    data = {"name": setting_created.name, "value": {}}
    r = client.post(
        f"{settings.API_V1_STR}/settings/", headers=superuser_token_headers, json=data,
    )
    assert r.status_code == 400


def test_update_setting_being_admin(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:
    setting_created = create_random_setting(db)
    setting_name = setting_created.name

    data = {"name": random_lower_string(), "value": {}}
    r = client.put(
        f"{settings.API_V1_STR}/settings/{setting_name}", headers=superuser_token_headers, json=data,
    )
    setting_updated = r.json()
    assert r.status_code == 200
    assert setting_updated
    assert setting_created.name != setting_updated.get("name")
    assert setting_updated.get("name") == data.get("name")

