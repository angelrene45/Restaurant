from typing import Any, Dict, Optional, Union

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.food import Food, Food_Unit, Food_Variant
from app.schemas.food import FoodCreate, FoodUpdate
from app.models.category import Category


class CRUDFood(CRUDBase[Food, FoodCreate, FoodUpdate]):
    def get_by_name(self, db: Session, *, name: str) -> Optional[Food]:
        return db.query(Food).filter(Food.name == name).first()

    def get_variant_by_name(self, db: Session, *, food_id: int, name: str) -> Optional[Food_Variant]:
        return db.query(Food_Variant).filter(Food_Variant.food_id == food_id and Food_Variant.name == name).first()

    def create(self, db: Session, *, obj_in: FoodCreate, categories_db: list[Category]) -> Food:
        """
            Create food 
                - Create food
                - Create variants (one to many)
                - Create Units (one to many)
                - Link existing categories (many to many)
        """
        # map schemas pydantic to sqlalchemy model
        variants = [Food_Variant(**variant.dict()) for variant in obj_in.variants]
        units = [Food_Unit(**unit.dict()) for unit in obj_in.units]

        # map model
        db_obj_food = Food(
            name=obj_in.name, 
            description=obj_in.description, 
            variants=variants,
            units=units,
            discount=obj_in.discount, 
            is_active=obj_in.is_active, 
            categories=categories_db,
        )
        db.add(db_obj_food)
        db.commit()
        db.refresh(db_obj_food)
        return db_obj_food

    def update(
        self, db: Session, *, db_obj: Food, obj_in: Union[FoodUpdate, Dict[str, Any]], categories_db: list[Category]
    ) -> Food:
        # map schemas pydantic to sqlalchemy model
        variants = [Food_Variant(**variant.dict()) for variant in obj_in.variants]
        units = [Food_Unit(**unit.dict()) for unit in obj_in.units]

        obj_data = jsonable_encoder(db_obj)
        update_data = obj_in.dict(exclude_unset=True)

        # update all values except relations
        for field in obj_data:
            if field in update_data and field not in ["variants", "units"]:
                setattr(db_obj, field, update_data[field])

        db_obj.categories = categories_db
        db_obj.variants = variants
        db_obj.units = units

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def is_active(self, food: Food) -> bool:
        return food.is_active


food = CRUDFood(Food)