from enum import Enum

from pydantic import BaseModel

class UserTypeEnum(str, Enum):
    user: str = "user"
    customer: str = "customer"

class UserType(BaseModel):
    user_type: UserTypeEnum