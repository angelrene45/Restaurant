from sqlalchemy import ForeignKey, Boolean, Column, Integer, String, DateTime, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base_class import Base


class Customer(Base):
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    addresses = relationship("Customer_Address", backref='customer', cascade='all, delete-orphan')
    email = Column(String, unique=True, index=True, nullable=False)
    mobile = Column(String, unique=True, index=True)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean(), default=True)
    last_login = Column(DateTime)
    created_date = Column(DateTime, server_default=func.now())
    updated_date = Column(DateTime, server_default=func.now(), onupdate=func.current_timestamp())


class Customer_Address(Base):
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    customer_id = Column(Integer, ForeignKey("customer.id"), index=True, nullable=False)
    street = Column(String)
    city = Column(String)
    state = Column(String)
    country = Column(String)
    postal_code = Column(Integer)
    location = Column(JSON)