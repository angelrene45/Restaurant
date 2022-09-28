from typing import Generator

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.core import security
from app.crud import crud_user
from app.db.session import SessionLocal
from app.core.config import settings

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/login/access-token"
)


def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(reusable_oauth2)
) -> models.User | models.Customer:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        token_data = schemas.TokenPayload(**payload)
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    crud_object = crud.user if token_data.user_type == schemas.UserTypeEnum.user else crud.customer
    user = crud_object.get(db, id=token_data.sub)
    if not user:
        raise HTTPException(status_code=404, detail="User or Customer not found")
    return user


def get_current_active_user(
    current_user: models.User | models.Customer = Depends(get_current_user),
) -> models.User | models.Customer:
    crud_object = crud.user if isinstance(current_user, models.User) else crud.customer
    if not crud_object.is_active(current_user):
        raise HTTPException(status_code=400, detail="Inactive user or customer")
    return current_user


def get_current_active_superuser(
    current_user: models.User = Depends(get_current_user),
) ->  models.User:
    if isinstance(current_user, models.Customer):
        raise HTTPException(
            status_code=400, detail="The user is customer and doesn't have enough privileges"
        )
    if not crud.user.is_admin(current_user):
        raise HTTPException(
            status_code=400, detail="The user doesn't have enough privileges"
        )
    return current_user