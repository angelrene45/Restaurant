from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud
from app.schemas.setting import SettingCreate, SettingUpdate
from app.tests.utils.utils import random_lower_string


def test_create_setting(db: Session) -> None:
    name = random_lower_string()
    setting_in = SettingCreate(name=name, value={})
    setting = crud.setting.create(db, obj_in=setting_in)
    assert setting.name == name


def test_update_setting(db: Session) -> None:
    name = random_lower_string()
    setting_in = SettingCreate(name=name, value={})
    setting = crud.setting.create(db, obj_in=setting_in)
    new_name = random_lower_string()
    setting_in_update = SettingUpdate(name=new_name, value={'business': 'data'})
    crud.setting.update(db, db_obj=setting, obj_in=setting_in_update)
    setting_2 = crud.setting.get_by_name(db, name=setting.name)
    assert setting_2
    assert setting.name == setting_2.name


def test_get_setting(db: Session) -> None:
    name = random_lower_string()
    setting_in = SettingCreate(name=name, value={})
    setting = crud.setting.create(db, obj_in=setting_in)
    setting_2 = crud.setting.get_by_name(db, name=setting.name)
    assert setting_2
    assert setting.name == setting_2.name
    assert jsonable_encoder(setting) == jsonable_encoder(setting_2)