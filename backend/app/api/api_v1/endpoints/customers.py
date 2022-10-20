from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException, BackgroundTasks
from fastapi.encoders import jsonable_encoder
from pydantic.networks import EmailStr
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.core.config import settings
from app.utils import send_new_account_email

router = APIRouter()


@router.post("/open", response_model=schemas.Customer)
def create_customer_open(
    background_tasks: BackgroundTasks,
    *,
    db: Session = Depends(deps.get_db),
    customer_in: schemas.CustomerCreate,
) -> Any:
    """
    Create new customer without the need to be logged in.
    """
    if not settings.USERS_OPEN_REGISTRATION:
        raise HTTPException(
            status_code=403,
            detail="Open customer registration is forbidden on this server",
        )
    customer = crud.customer.get_by_email(db, email=customer_in.mobile)
    if not customer: customer = crud.customer.get_by_mobile(db, mobile=customer_in.mobile)
    if customer:
        raise HTTPException(
            status_code=400,
            detail="The customer with this username already exists in the system",
        )
    customer = crud.customer.create(db, obj_in=customer_in)
    if settings.EMAILS_ENABLED and customer_in.email:
        background_tasks.add_task(send_new_account_email,  email_to=customer_in.email, username=customer_in.email, password=customer_in.password, type_user=1)
    return customer


@router.get("/me", response_model=schemas.Customer)
def read_customer_me(
    db: Session = Depends(deps.get_db),
    current_user: models.Customer = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get current customer.
    """
    return current_user


@router.put("/me", response_model=schemas.Customer)
def update_customer_me(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schemas.CustomerUpdate,
    current_user: models.Customer = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update own customer.
    """
    customer = crud.customer.update(db, db_obj=current_user, obj_in=user_in)
    return customer


@router.get("/", response_model=List[schemas.Customer])
def read_customers_being_admin(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.Customer = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Retrieve all customers being admin.
    """
    customers = crud.customer.get_multi(db, skip=skip, limit=limit)
    return customers


@router.get("/{customer_id}", response_model=schemas.User)
def read_customer_by_id_being_admin(
    customer_id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.Customer = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Get a specific customer by id being admin user.
    """
    customer = crud.customer.get(db, id=customer_id)
    if not customer:
        raise HTTPException(
            status_code=400, detail="The customer doesn't exists"
        )
    return customer


@router.post("/", response_model=schemas.Customer)
def create_customer_being_admin(
    background_tasks: BackgroundTasks,
    *,
    db: Session = Depends(deps.get_db),
    customer_in: schemas.CustomerCreate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Create new customer being admin customer.
    """
    customer = crud.customer.get_by_email(db, email=customer_in.email)
    if not customer: customer = crud.customer.get_by_mobile(db, mobile=customer_in.mobile)
    if customer:
        raise HTTPException(
            status_code=400,
            detail="The customer with this email or mobile already exists in the system.",
        )
    customer = crud.customer.create(db, obj_in=customer_in)
    if settings.EMAILS_ENABLED and customer_in.email:
        background_tasks.add_task(send_new_account_email, email_to=customer_in.email, username=customer_in.email, password=customer_in.password, type_user=1)
    return customer


@router.put("/{customer_id}", response_model=schemas.Customer)
def update_customer_being_admin(
    *,
    db: Session = Depends(deps.get_db),
    customer_id: int,
    user_in: schemas.CustomerUpdate,
    current_user: models.Customer = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update a customer being admin.
    """
    customer = crud.customer.get(db, id=customer_id)
    if not customer:
        raise HTTPException(
            status_code=404,
            detail="The customer with this username does not exist in the system",
        )
    customer = crud.customer.update(db, db_obj=customer, obj_in=user_in)
    return customer