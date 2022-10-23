from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()


@router.get("/", response_model=List[schemas.Order])
def read_orders(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100
    ) -> Any:
    """
    Retrieve orders
    """
    orders = crud.order.get_multi(db, skip=skip, limit=limit)
    return orders


@router.get("/{order_id}", response_model=schemas.Order)
def read_order_by_id(
    order_id: int,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Get a specific order by id.
    """
    order = crud.order.get(db, id=order_id)
    if not order:
        raise HTTPException(
            status_code=400, detail="The order doesn't exists"
        )
    return order


@router.post("/", response_model=schemas.Order)
def create_order(
    *,
    db: Session = Depends(deps.get_db),
    order_in: schemas.OrderCreate,
) -> Any:
    """
    Create new order system by admin.
    """
    order = crud.order.create(db, obj_in=order_in)
    return order


@router.put("/{order_id}", response_model=schemas.Order)
def update_order(
    *,
    db: Session = Depends(deps.get_db),
    order_id: int,
    order_in: schemas.OrderUpdate,
) -> Any:
    """
    Update a order.
    """
    order = crud.order.get(db, id=order_id)
    if not order:
        raise HTTPException(
            status_code=400, detail="The Order doesn't exist"
        )
    order_updated = crud.order.update(db, db_obj=order, obj_in=order_in)
    return order_updated