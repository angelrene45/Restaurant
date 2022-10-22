import re
from typing import Optional, List
from datetime import datetime

from pydantic import BaseModel, EmailStr, validator

example_user = {
    "example": {
        "email": "user@example.com",
        "mobile": "+524490227820",
        "first_name": "string",
        "last_name": "string",
        "is_active": True,
        "password": "string",
        "addresses": [
                {
                    "street": "8 My Street",
                    "city": "New York",
                    "state": "NY",
                    "country": "USA",
                    "postal_code": 10014,
                    "location": {},
                }
        ]
    }
}

class CustomerAddress(BaseModel):
    street: Optional[str]
    city: Optional[str]
    state: Optional[str]
    country: Optional[str]
    postal_code: Optional[str]
    location: Optional[dict]

    class Config:
        orm_mode = True


class CustomerBase(BaseModel):
    email: Optional[EmailStr] = None
    mobile: Optional[str] = None
    addresses: Optional[List[CustomerAddress]] = []
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    is_active: Optional[bool] = True

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
    addresses: List[CustomerAddress] = []

    class Config:
        schema_extra = example_user


# Properties to receive via API on update
class CustomerUpdate(CustomerBase):
    password: Optional[str] = None
    addresses: List[CustomerAddress] = []

    class Config:
        schema_extra = example_user


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