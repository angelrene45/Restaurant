import os 

from datetime import datetime, timedelta
from typing import Any, Union, Tuple

from jose import jwt
from passlib.context import CryptContext

from app.core.config import settings
from app import schemas

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ALGORITHM = "HS256"

def create_access_token(subject: Union[str, Any], user_type: str, user_rol: str, expires_delta: timedelta = None) -> str:
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    to_encode = {"exp": expire, "sub": str(subject), "user_type": user_type, "user_rol": user_rol}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def validate_access_token(token: str) -> Tuple[bool, schemas.TokenPayload] :
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[ALGORITHM]
        )
        data_token = schemas.TokenPayload(**payload)
        is_valid = True
    except (jwt.JWTError) as e:
        print("Token not valid", e)
        is_valid = False
        data_token = schemas.TokenPayload()

    return is_valid, data_token

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)