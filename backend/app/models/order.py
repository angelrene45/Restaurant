from enum import Enum
from sqlalchemy import ForeignKey, Boolean, Column, Integer, String, DateTime, Numeric, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import ENUM
from sqlalchemy.ext.associationproxy import association_proxy

from app.db.base_class import Base

class StatusOrder(str, Enum):
    new: str = "new"
    preparing: str = "preparing"
    delivering: str = "delivering"
    delivered: str = "delivered"
    returned: str = "returned"
    paid: str = "paid"
    cancel: str = "cancel"
    failed: str = "failed"

class TypesOrder(str, Enum):
    restaurant: str = "restaurant"
    pick_up: str = "pick_up"
    shipment: str = "shipment"


class Order(Base):
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("user.id"), index=True, nullable=True)
    customer_id = Column(Integer, ForeignKey("customer.id"), index=True, nullable=True)
    board_id = Column(Integer, ForeignKey("board.id"), index=True, nullable=True)
    foods = relationship("Order_Food", backref='order', cascade='all, delete-orphan')
    status = Column(ENUM(StatusOrder), default=StatusOrder.new)
    status_foods = Column(Boolean, default=False)
    status_drinks = Column(Boolean, default=False)
    order_type = Column(ENUM(TypesOrder), nullable=False)
    address= Column(Text)
    note = Column(Text)
    subtotal = Column(Numeric(10, 2))
    tax = Column(Numeric(10, 2))
    total = Column(Numeric(10, 2))
    discount = Column(Integer)
    grant_total = Column(Numeric(10, 2))
    created_date = Column(DateTime, server_default=func.now())
    updated_date = Column(DateTime, server_default=func.now(), onupdate=func.current_timestamp())


class Order_Food(Base):
    order_id = Column(Integer, ForeignKey("order.id"), primary_key=True, index=True, nullable=False)
    food_id = Column(Integer, ForeignKey("food.id"), primary_key=True, index=True, nullable=False)
    variant = Column(String, primary_key=True, index=True, nullable=False)
    unit = Column(String, primary_key=True, index=True, nullable=False)
    status = Column(Boolean, default=False)
    category = Column(Integer, ForeignKey("category.id"))
    name = Column(String)
    quantity = Column(Integer)
    price = Column(Numeric(10, 2))