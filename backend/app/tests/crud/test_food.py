from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud
from app.schemas.food import Food, FoodCreate, FoodUpdate, FoodVariant, FoodUnit
from app.tests.utils.utils import random_lower_string, random_integer, random_float
from app.tests.utils.category import create_random_category
from app.tests.utils.food import create_random_food, create_random_food_units, create_random_food_variants
from app.tests.utils.user import create_random_user_admin


def test_create_food(db: Session) -> None:
    food = create_random_food(db)
    assert len(food.categories) == 2
    assert len(food.variants) == 3
    assert len(food.units) == 3
    assert food


def test_update_food(db: Session) -> None:
    new_categories = [create_random_category(db)]
    food = create_random_food(db)
    new_name = random_lower_string()
    new_discount = random_integer()
    new_variants = create_random_food_variants(n=5)
    new_units = create_random_food_units(n=1)
    food_in_update = FoodUpdate(name=new_name, discount=new_discount, variants=new_variants, units=new_units)
    crud.food.update(db, db_obj=food, obj_in=food_in_update, categories_db=new_categories)
    food_2 = crud.food.get(db, id=food.id)
    assert food_2
    assert food.name == food_2.name
    assert len(food.variants) == 5
    assert len(food.units) == 1
    assert len(food.categories) == 1


def test_update_food_existing_variant(db: Session) -> None:
    food = create_random_food(db)
    existing_variant = food.variants[0]
    new_name = "new variant"
    update_variant = FoodVariant(food_id=existing_variant.food_id, name=new_name)
    food_in_update = FoodUpdate(variants=[update_variant])
    crud.food.update(db, db_obj=food, obj_in=food_in_update, categories_db=[])
    food_2 = crud.food.get(db, id=food.id)
    assert food_2
    assert food.variants[0].name == new_name


def test_update_food_existing_unit(db: Session) -> None:
    food = create_random_food(db)
    existing_unit = food.units[0]
    new_unit = "new unit"
    new_price = random_float()
    update_unit = FoodUnit(food_id=existing_unit.food_id, unit=new_unit, price=new_price)
    food_in_update = FoodUpdate(units=[update_unit])
    crud.food.update(db, db_obj=food, obj_in=food_in_update, categories_db=[])
    food_2 = crud.food.get(db, id=food.id)
    assert food_2
    assert food.units[0].unit == new_unit
    assert float(food.units[0].price) == new_price


def test_check_if_food_is_active(db: Session) -> None:
    food = create_random_food(db)
    is_active = crud.food.is_active(food)
    assert is_active is True


def test_check_if_food_is_inactive(db: Session) -> None:
    food = create_random_food(db)
    food_in_update = FoodUpdate(is_active=False)
    crud.food.update(db, db_obj=food, obj_in=food_in_update, categories_db=[])
    food_2 = crud.food.get(db, id=food.id)
    is_active = crud.food.is_active(food_2)
    assert is_active is False


def test_get_food(db: Session) -> None:
    food = create_random_food(db)
    food_2 = crud.food.get(db, id=food.id)
    assert food_2
    assert food.name == food_2.name
    assert food.categories == food_2.categories
    assert jsonable_encoder(food) == jsonable_encoder(food_2)


def test_get_multi_food(db: Session) -> None:
    food_created = [create_random_food(db) for _ in range(10)]
    food_db = crud.food.get_multi(db)
    assert food_db
    assert len(food_db) >= len(food_created)