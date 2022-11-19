import random
from sqlalchemy.orm import Session

from app import crud, models
from app.schemas.order import OrderCreate, OrderFood
from app.models.order import StatusOrder
from app.tests.utils.utils import random_boolean, random_float, random_lower_string, random_integer
from app.tests.utils.user import create_random_user
from app.tests.utils.customer import create_random_customer
from app.tests.utils.board import create_random_board
from app.tests.utils.food import create_random_food


def select_random_order_status() -> str:
    status = [e.value for e in StatusOrder]
    return random.choice(status)


def create_random_order_foods(db:Session, n=3, as_dict=False) -> models.Order_Food:
    foods_created = [create_random_food(db) for _ in range(n)]
    if as_dict:
        return [OrderFood(food_id=food.id, name=food.name, quantity=random_integer(), price=random_float(), variant=random_lower_string(), unit=random_lower_string()).dict() for food in foods_created]
    else:
        return [OrderFood(food_id=food.id, name=food.name, quantity=random_integer(), price=random_float(), variant=random_lower_string(), unit=random_lower_string()) for food in foods_created]


def create_random_order(db: Session, n_foods: int=3) -> models.Order:
    # create user, customer and board
    user = create_random_user(db)
    customer = create_random_customer(db)
    board = create_random_board(db)
    # create random foods
    foods = create_random_order_foods(db, n=n_foods, as_dict=True)
    # create object schema 
    order_in = OrderCreate(user_id = user.id,
                        customer_id = customer.id,
                        board_id = board.id,
                        foods = foods,
                        status = select_random_order_status(),
                        subtotal= random_float(),
                        tax = random_float(),
                        total = random_float(),
                        discount = random_integer(),
                        grant_total = random_float(),
                        )
    return crud.order.create(db=db, obj_in=order_in)
