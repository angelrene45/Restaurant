from locale import currency
import re
from typing import Optional
from datetime import datetime

from pydantic import BaseModel, EmailStr, validator

from app.models.payment import StatusPayment, TypePayment


# Shared properties
class PaymentBase(BaseModel):
    payment_id: Optional[str] = None
    order_id: Optional[int] = None
    customer_id: Optional[int] = None
    user_id: Optional[int] = None
    type_cart: Optional[TypePayment] = None
    status: Optional[StatusPayment] = None
    currency: Optional[str] = None
    amount: Optional[float] = None


# Properties to receive via API on creation
class PaymentCreate(PaymentBase):
    payment_id: str
    currency: str
    amount: float


class PaymentCreateApi(BaseModel):
    token: str
    payment_id: str
    currency: str
    amount: float


# Properties to receive via API on update
class PaymentUpdate(PaymentBase):
    pass


class PaymentInDBBase(PaymentBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class Payment(PaymentInDBBase):
    created_date: Optional[datetime] = None
    updated_date: Optional[datetime] = None