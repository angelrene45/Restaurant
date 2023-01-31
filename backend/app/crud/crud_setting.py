from typing import Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.setting import Setting
from app.schemas.setting import SettingCreate, SettingUpdate


class CRUDSetting(CRUDBase[Setting, SettingCreate, SettingUpdate]):
    def get_by_name(self, db: Session, *, name: str) -> Optional[Setting]:
        return db.query(Setting).filter(Setting.name == name).first()

setting = CRUDSetting(Setting)