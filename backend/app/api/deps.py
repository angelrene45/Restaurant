from typing import Generator, Optional, List

from fastapi import Depends, HTTPException, status, UploadFile, File
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


def file_image_food(
    list_files: Optional[List[UploadFile]] = File(None, description="A file read as bytes"),
) ->  models.User:
    image_formats = ("image/png", "image/jpeg", "image/jpg")
    for file in list_files:
        if file:
            if not file.content_type in image_formats:
                raise HTTPException(
                    status_code=400, detail=f"The file {file.filename} is not a valid image"
                )

            size_bytes = len(file.file.read())
            if size_bytes > settings.IMAGE_SIZE_LIMIT_BYTES:
                raise HTTPException(
                    status_code=400, detail=f"The file {file.filename} is greater than {settings.IMAGE_SIZE_LIMIT_BYTES} Bytes"
                )
            file.file.seek(0)
    return list_files