from typing import Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.layout import Layout
from app.schemas.layout import LayoutCreate, LayoutUpdate


class CRUDLayout(CRUDBase[Layout, LayoutCreate, LayoutUpdate]):
    def get_by_name(self, db: Session, *, name: str) -> Optional[Layout]:
        return db.query(Layout).filter(Layout.name == name).first()

layout = CRUDLayout(Layout)