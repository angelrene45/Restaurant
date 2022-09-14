from typing import Optional

from pydantic import BaseModel

from .user import User


class Token(BaseModel):
    access_token: str
    token_type: str
    user_data: User


class TokenPayload(BaseModel):
    sub: Optional[int] = None
