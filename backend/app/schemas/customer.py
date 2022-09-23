import re
from typing import Optional
from datetime import datetime

from pydantic import BaseModel, EmailStr, validator

# Shared properties
class CustomerBase(BaseModel):
    email: Optional[EmailStr] = None
    mobile: Optional[str] = None
    is_active: Optional[bool] = True
    first_name: Optional[str] = None
    last_name: Optional[str] = None

    @validator("mobile")
    def phone_validation(cls, v):
        regex = r"^(\+)[1-9][0-9\-\(\)\.]{9,15}$"
        if v and not re.search(regex, v, re.I):
            raise ValueError("Phone Number Invalid.")
        return v

# Properties to receive via API on creation
class CustomerCreate(CustomerBase):
    email: EmailStr
    password: str


# Properties to receive via API on update
class CustomerUpdate(CustomerBase):
    password: Optional[str] = None


class CustomerInDBBase(CustomerBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class Customer(CustomerInDBBase):
    last_login: Optional[datetime] = None


# Additional properties stored in DB
class CustomerInDB(CustomerInDBBase):
    hashed_password: str