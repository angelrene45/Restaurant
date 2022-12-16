from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Body, Depends, HTTPException, BackgroundTasks
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.param_functions import Form
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.core import security
from app.core.config import settings
from app.core.security import get_password_hash
from app.utils import (
    generate_password_reset_token,
    verify_password_reset_token,
    send_reset_password_email
)

router = APIRouter()


@router.post("/login/access-token", response_model=schemas.Token)
def login_access_token(
    background_tasks: BackgroundTasks,
    db: Session = Depends(deps.get_db), 
    form_data: OAuth2PasswordRequestForm = Depends(),
    user_type: str = Form(default="user", enum=[value for value in schemas.UserTypeEnum]),
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    this access-token works for users and customers
    """
    crud_object = crud.user if user_type == schemas.UserTypeEnum.user else crud.customer
    user = crud_object.authenticate(
        db, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not crud_object.is_active(user):
        raise HTTPException(status_code=400, detail="Inactive user")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    background_tasks.add_task(crud_object.update_lastlogin, db, db_obj=user)
    user_rol = user.role if user_type == schemas.UserTypeEnum.user else ''
    return {
        "access_token": security.create_access_token(
            user.id, user_type, user_rol, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
        "user_data": user,
    }


@router.post("/login/refresh-token", response_model=schemas.Token)
def refresh_token(  
    token: str = Body(...),
    user_type: str = Body(default="user", enum=[value for value in schemas.UserTypeEnum]),
    db: Session = Depends(deps.get_db), 
) -> Any:
    """
    Refresh token
    """
    if not token:
        raise HTTPException(status_code=400, detail="Token not sent")
    is_valid, data_token = security.validate_access_token(token)
    if not is_valid: 
        raise HTTPException(status_code=400, detail="Token not valid")
    crud_object = crud.user if user_type == schemas.UserTypeEnum.user else crud.customer
    user = crud_object.get(db, id=data_token.sub)
    if not user: 
        raise HTTPException(status_code=400, detail=f"User doest exists from user type: {user_type}")
    user_rol = user.role if user_type == schemas.UserTypeEnum.user else ''
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            user.id, user_type, user_rol, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
        "user_data": user,
    }


@router.post("/login/test-token", response_model=schemas.User)
def test_token(current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Test access token
    """
    return current_user


@router.post("/password-recovery", response_model=schemas.Msg)
def recover_password(data: schemas.ResetPasswordPayload, db: Session = Depends(deps.get_db)) -> Any:
    """
    Password Recovery
    """
    user = crud.user.get_by_email(db, email=data.email)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this username does not exist in the system.",
        )
    password_reset_token = generate_password_reset_token(email=data.email, user_type=data.user_type)
    send_reset_password_email(
        email_to=user.email, email=data.email, token=password_reset_token
    )
    return {"msg": "Password recovery email sent"}


@router.post("/reset-password/", response_model=schemas.Msg)
def reset_password(
    token: str = Body(...),
    new_password: str = Body(...),
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Reset password
    """
    email, user_type = verify_password_reset_token(token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid token")
    crud_object = crud.user if user_type == schemas.UserTypeEnum.user else crud.customer
    user = crud_object.get_by_email(db, email=email)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this username does not exist in the system.",
        )
    elif not crud_object.is_active(user):
        raise HTTPException(status_code=400, detail="Inactive user or customer")
    hashed_password = get_password_hash(new_password)
    user.hashed_password = hashed_password
    db.add(user)
    db.commit()
    return {"msg": "Password updated successfully"}
