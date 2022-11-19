import os
from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, Request
from sqlalchemy.orm import Session
import requests

from app import crud, models, schemas
from app.api import deps
from app.api.sockets_v1.endpoints.orders import manager

router = APIRouter()

@router.get("/emit-ws", response_model=schemas.Msg)
async def emit_orders_ws(request: Request):
    """
    Emit socket messages to all clients 
    """
    # this cookie is from create_order endpoint
    cookie = request.cookies.get("emit", None)
    if cookie == 'create_order':
        await manager.broadcast()
        return {"msg":"Broadcast Orders"}
    else:
        return {"msg":"Not allowed"}


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


@router.get("/count")
def read_total_orders(
    db: Session = Depends(deps.get_db),
    ) -> Any:
    """
    Retrieve total orders store in database
    """
    total_orders = crud.order.get_total_records(db)
    return total_orders


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
    background_tasks: BackgroundTasks,
    request: Request
) -> Any:
    """
    Create new order.
    """
    order = crud.order.create(db, obj_in=order_in)

    # emit messages in websocket for new order arrives and avoid problem with pytest
    if os.getenv('TESTING', '') != 'True': background_tasks.add_task(lambda: requests.get(request.url_for('emit_orders_ws'), cookies={"emit": "create_order"}))
    
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