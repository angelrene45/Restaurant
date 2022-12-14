from typing import Optional

from sqlalchemy.orm import Session

from app import crud, models
from app.schemas.category import CategoryCreate
from app.tests.utils.user import create_random_user
from app.tests.utils.utils import random_lower_string


def create_random_category(db: Session) -> models.Category:
    name = random_lower_string()
    category_in = CategoryCreate(name=name)
    return crud.category.create(db=db, obj_in=category_in)
