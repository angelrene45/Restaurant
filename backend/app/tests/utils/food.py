from typing import Optional

from sqlalchemy.orm import Session

from app import crud, models
from app.schemas.food import FoodCreate, FoodUnit, FoodVariant
from app.tests.utils.utils import random_boolean, random_lower_string, random_float, random_integer
from app.tests.utils.category import create_random_category


def create_random_food_variants(n=3) -> models.Food_Variant:
    return [FoodVariant(name=random_lower_string(), image="", is_active=random_boolean()) for _ in range(n)]


def create_random_food_units(n=3) -> models.Food_Variant:
    return [FoodUnit(unit=random_lower_string(), price=random_float(), is_active=random_boolean()) for _ in range(n)]


def create_random_food(db: Session) -> models.Food:
    categories_db = [create_random_category(db), create_random_category(db)]
    variants = create_random_food_variants()
    units = create_random_food_units()

    food_in = FoodCreate(name = random_lower_string(),
                        description = random_lower_string(),
                        discount = random_integer(),
                        variants = variants,
                        units = units,
                        is_active = True)
    return crud.food.create(db=db, obj_in=food_in, categories_db=categories_db)
