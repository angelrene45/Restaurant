from sqlalchemy import ForeignKey, Boolean, Column, Integer, String, DateTime, Numeric, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.ext.associationproxy import association_proxy

from app.db.base_class import Base

class Food(Base):
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, index=True, nullable=False)
    description = Column(Text, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    history_price = relationship("Food_History_Price")
    categories = relationship("Category", secondary="category_food")
    discount = Column(Integer, nullable=True)
    image = Column(String, nullable=True)
    is_active = Column(Boolean(), default=True)
    created_date = Column(DateTime, server_default=func.now())
    updated_date = Column(DateTime, server_default=func.now(), onupdate=func.current_timestamp())


class Food_History_Price(Base):
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    food_id = Column(Integer, ForeignKey("food.id"), primary_key=True, index=True,  nullable=False)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=True)
    price = Column(Numeric(10, 2), nullable=False)
    created_date = Column(DateTime, server_default=func.now())
    user = relationship("User", foreign_keys="Food_History_Price.user_id")
    user_name = association_proxy("user", "first_name")


class Category_Food(Base):
    category_id = Column(Integer, ForeignKey("category.id"), primary_key=True)
    food_id = Column(Integer, ForeignKey("food.id"), primary_key=True)