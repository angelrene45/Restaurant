from sqlalchemy import Computed, Index, ForeignKey, Boolean, Column, Integer, String, DateTime, Numeric, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base_class import Base
from app.utils.sqlalchemy.custom_types import TSVector

class Food(Base):
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, index=True, nullable=False)
    description = Column(Text, nullable=False)
    variants = relationship("Food_Variant", backref='food', cascade='all, delete-orphan')
    units = relationship("Food_Unit", backref='food', cascade='all, delete-orphan')
    categories = relationship("Category", secondary="category_food", back_populates="foods")
    discount = Column(Integer, nullable=True)
    is_active = Column(Boolean(), default=True)
    created_date = Column(DateTime, server_default=func.now())
    updated_date = Column(DateTime, server_default=func.now(), onupdate=func.current_timestamp())

    tsv = Column(TSVector(), Computed(
        "to_tsvector('english',  name || ' ' ||  description)",
        persisted=True)
    )

    __table_args__ = (
        Index('idx_food_tsv', tsv, postgresql_using='gin'),
    )

class Food_Variant(Base):
    food_id = Column(Integer, ForeignKey("food.id"), primary_key=True, index=True, nullable=False)
    name = Column(String, primary_key=True, index=True, nullable=False)
    image = Column(String, nullable=True)
    is_active = Column(Boolean(), default=True)


class Food_Unit(Base):
    food_id = Column(Integer, ForeignKey("food.id"), primary_key=True, index=True, nullable=False)
    unit = Column(String, primary_key=True, index=True, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    is_active = Column(Boolean(), default=True)


class Category_Food(Base):
    category_id = Column(Integer, ForeignKey("category.id"), primary_key=True)
    food_id = Column(Integer, ForeignKey("food.id"), primary_key=True)