from typing import Any, Dict, Optional, Union

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.food import Food, Food_History_Price
from app.schemas.food import FoodCreate, FoodUpdate
from app.models.category import Category


class CRUDFood(CRUDBase[Food, FoodCreate, FoodUpdate]):
    def get_by_name(self, db: Session, *, name: str) -> Optional[Food]:
        return db.query(Food).filter(Food.name == name).first()

    def create(self, db: Session, *, obj_in: FoodCreate, categories_db: list[Category]) -> Food:
        db_obj_food = Food(
            name=obj_in.name, 
            description=obj_in.description, 
            price=obj_in.price, 
            discount=obj_in.discount, 
            is_active=obj_in.is_active, 
            categories=categories_db,
            image=obj_in.image
        )
        db.add(db_obj_food)
        db.commit()
        db.refresh(db_obj_food)
        return db_obj_food

    def update(
        self, db: Session, *, db_obj: Food, obj_in: Union[FoodUpdate, Dict[str, Any]], categories_db: list[Category]
    ) -> Food:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        db_obj.categories = categories_db
        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def update_new_price(self, db: Session, *, db_obj: Food, user_id: int) -> Food:
        db_obj_price = Food_History_Price(
            food_id = db_obj.id,
            user_id = user_id,
            price = db_obj.price
        )
        db.add(db_obj_price)
        db.commit()
        db.refresh(db_obj_price)
        return db_obj

    def is_active(self, food: Food) -> bool:
        return food.is_active


food = CRUDFood(Food)