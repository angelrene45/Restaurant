from typing import Any, Dict, Optional, Union

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.order import Order, Order_Food
from app.schemas.order import OrderCreate, OrderUpdate


class CRUDOrder(CRUDBase[Order, OrderCreate, OrderUpdate]):
    def create(self, db: Session, *, obj_in: OrderCreate) -> Order:
        """
            Create order 
                - Create order
                - Create foods (one to many relationship)
        """
        # map schemas pydantic to sqlalchemy model
        foods = [Order_Food(**food.dict()) for food in obj_in.foods]

        # map model
        db_obj_order = Order(
            user_id = obj_in.user_id,
            customer_id = obj_in.customer_id,
            board_id = obj_in.board_id,
            foods = foods,
            status = obj_in.status,
            subtotal= obj_in.subtotal,
            tax = obj_in.tax,
            total = obj_in.total,
            discount = obj_in.discount,
            grant_total = obj_in.grant_total
        )
        db.add(db_obj_order)
        db.commit()
        db.refresh(db_obj_order)
        return db_obj_order

    def update(
        self, db: Session, *, db_obj: Order, obj_in: Union[OrderUpdate, Dict[str, Any]]
    ) -> Order:
        # map schemas pydantic to sqlalchemy model
        foods = [Order_Food(**food.dict()) for food in obj_in.foods]

        # Convert model into dict
        obj_data = jsonable_encoder(db_obj)
        update_data = obj_in.dict(exclude_unset=True)

        # update all values except relationship
        for field in obj_data:
            if field in update_data and field not in ["foods"]:
                setattr(db_obj, field, update_data[field])
        db_obj.foods = foods
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def is_active(self, order: Order) -> bool:
        return order.is_active


order = CRUDOrder(Order)