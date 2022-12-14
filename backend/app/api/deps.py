from typing import Generator, Optional, List, Union

from fastapi import Depends, HTTPException, status, UploadFile, File, Query, WebSocket
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.core import security
from app.db.session import SessionLocal
from app.core.config import settings
from app.models.user import RolUser

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
    files: Optional[List[UploadFile]] = File([], description="A file read as bytes"),
) -> Optional[List[UploadFile]]:
    image_formats = ("image/png", "image/jpeg", "image/jpg")
    for file in files:
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
    return files


async def authorize_ws_token_data(
    websocket: WebSocket,
    token: Union[str, None] = Query(default=None)
) -> bool:
    if not token:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION, reason="no token in params")
        return False
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        token_data = schemas.TokenPayload(**payload)

        # check if token is user system and the rol
        if token_data.user_type == schemas.UserTypeEnum.user:
            return True
        
        # here is invalid user or customer
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION, reason="Could not validate credentials")
        return False
        
    except (jwt.JWTError, ValidationError):
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION, reason="Could not validate credentials")
        return False
