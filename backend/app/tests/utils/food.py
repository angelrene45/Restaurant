from typing import Optional

from sqlalchemy.orm import Session

from app import crud, models
from app.schemas.food import FoodCreate
from app.tests.utils.utils import random_lower_string, random_float, random_integer
from app.tests.utils.category import create_random_category


def create_random_food(db: Session) -> models.Food:
    categories_db = [create_random_category(db), create_random_category(db)]
    food_in = FoodCreate(name = random_lower_string(),
                        description = random_lower_string(),
                        price = random_float(),
                        discount = random_integer(),
                        image = None,
                        is_active = True)
    return crud.food.create(db=db, obj_in=food_in, categories_db=categories_db)
