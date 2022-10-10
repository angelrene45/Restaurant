from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud
from app.schemas.food import FoodCreate, FoodUpdate
from app.tests.utils.utils import random_lower_string, random_integer, random_float
from app.tests.utils.category import create_random_category
from app.tests.utils.food import create_random_food
from app.tests.utils.user import create_random_user_admin


def test_create_food(db: Session) -> None:
    food = create_random_food(db)
    assert len(food.categories) == 2
    assert food    


def test_update_food(db: Session) -> None:
    food = create_random_food(db)
    new_name = random_lower_string()
    new_discount = random_integer()
    new_categories = [create_random_category(db)]
    food_in_update = FoodUpdate(name=new_name, discount=new_discount)
    crud.food.update(db, db_obj=food, obj_in=food_in_update, categories_db=new_categories)
    food_2 = crud.food.get(db, id=food.id)
    assert food_2
    assert food.name == food_2.name
    assert len(food.categories) == 1


def test_update_new_price_food(db: Session) -> None:
    user = create_random_user_admin(db)
    food = create_random_food(db)
    new_price = random_float()
    new_categories = [create_random_category(db)]
    food_in_update = FoodUpdate(price=new_price)
    food_updated = crud.food.update(db, db_obj=food, obj_in=food_in_update, categories_db=new_categories)
    crud.food.update_new_price(db, db_obj=food_updated, user_id=user.id)
    food_2 = crud.food.get(db, id=food.id)
    assert food_2
    assert food_2.history_price
    assert len(food_2.history_price) == 1
    assert float(food_2.history_price[-1].price) == float(new_price)


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