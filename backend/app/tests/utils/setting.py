from sqlalchemy.orm import Session

from app import crud, models
from app.schemas.setting import SettingCreate
from app.tests.utils.utils import random_lower_string


def create_random_setting(db: Session) -> models.Setting:
    name = random_lower_string()
    setting_in = SettingCreate(name=name, value={'name': 'company name', 'is_active': True})
    return crud.setting.create(db=db, obj_in=setting_in)
