from typing import Optional

from pydantic import BaseModel, EmailStr

from .user import User
from .customer import Customer
from .user_type import UserTypeEnum


class Token(BaseModel):
    access_token: str
    token_type: str
    user_data: User | Customer


class TokenPayload(BaseModel):
    sub: Optional[int] = None
    user_type: Optional[str] = None


class ResetPasswordPayload(BaseModel):
    email: Optional[EmailStr] = None
    user_type: Optional[UserTypeEnum] = None