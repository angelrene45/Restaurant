import re
from typing import Optional
from datetime import datetime

from pydantic import BaseModel, EmailStr, validator

from app.models.user import RolUser


# Shared properties
class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    mobile: Optional[str] = None
    is_active: Optional[bool] = True
    role: Optional[RolUser] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None

    @validator("mobile")
    def phone_validation(cls, v):
        print(f"phone in 2 validator:{v}")
        regex = r"^(\+)[1-9][0-9\-\(\)\.]{9,15}$"
        if v and not re.search(regex, v, re.I):
            raise ValueError("Phone Number Invalid.")
        return v

# Properties to receive via API on creation
class UserCreate(UserBase):
    email: EmailStr
    password: str


# Properties to receive via API on update
class UserUpdate(UserBase):
    password: Optional[str] = None


class UserInDBBase(UserBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class User(UserInDBBase):
    last_login: Optional[datetime] = None


# Additional properties stored in DB
class UserInDB(UserInDBBase):
    hashed_password: str
