from enum import Enum
from sqlalchemy import ForeignKey, Numeric, Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import ENUM
from sqlalchemy.sql import func

from app.db.base_class import Base

class TypePayment(str, Enum):
    credit_cart: str = "credit_cart"
    debit_cart: str = "debit_cart"
    cash: str = "cash"


class StatusPayment(str, Enum):
    pending: str = "pending"
    failed: str = "failed"
    declined: str = "declined"
    success: str = "success"
    cancel: str = "cancel"


class Payment(Base):
    id = Column(Integer, primary_key=True, index=True)
    payment_id = Column(String, unique=True, index=True, nullable=True)
    order_id = Column(Integer, ForeignKey("order.id"), index=True, nullable=False)
    customer_id = Column(Integer, ForeignKey("customer.id"), index=True, nullable=True)
    user_id = Column(Integer, ForeignKey("user.id"), index=True, nullable=True)
    type_cart = Column(ENUM(TypePayment))
    status = Column(ENUM(StatusPayment))
    currency = Column(String, nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    created_date = Column(DateTime, server_default=func.now())
    updated_date = Column(DateTime, server_default=func.now(), onupdate=func.current_timestamp())