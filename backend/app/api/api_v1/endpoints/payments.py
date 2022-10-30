from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()


@router.get("/open", response_model=List[schemas.Payment])
def read_payments_open(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve payments.
    """
    payments = crud.payment.get_multi(db, skip=skip, limit=limit)
    return payments


@router.get("/open/{payment_id}", response_model=schemas.Payment)
def read_payment_by_id(
    payment_id: int,
    db: Session = Depends(deps.get_db)
) -> Any:
    """
    Get a specific payment by id.
    """
    payment = crud.payment.get(db, id=payment_id)
    if not payment:
        raise HTTPException(
            status_code=400, detail="The payment doesn't exists"
        )
    return payment


@router.post("/", response_model=schemas.Payment)
def create_payment(
    *,
    db: Session = Depends(deps.get_db),
    payment_in: schemas.PaymentCreateApi,
) -> Any:
    """
    Create new payment system by admin.
    """

    
    # add payment to database
    payment_in_db = schemas.PaymentCreate()
    payment = crud.payment.create(db, obj_in=payment_in_db)
    return payment


@router.put("/{payment_id}", response_model=schemas.Payment)
def update_payment(
    *,
    db: Session = Depends(deps.get_db),
    payment_id: int,
    payment_in: schemas.PaymentUpdate,
) -> Any:
    """
    Update a payment.
    """
    payment = crud.payment.get(db, id=payment_id)
    if not payment:
        raise HTTPException(
            status_code=400, detail="The Payment doesn't exist"
        )
    payment_updated = crud.payment.update(db, db_obj=payment, obj_in=payment_in)
    return payment_updated