from typing import Optional

from sqlalchemy.orm import Session

from app import crud, models
from app.schemas.layout import LayoutCreate
from app.tests.utils.utils import random_lower_string, random_dict


def create_random_layout(db: Session) -> models.Layout:
    name = random_lower_string()
    items = random_dict()
    layout_in = LayoutCreate(name=name, items=items)
    return crud.layout.create(db=db, obj_in=layout_in)