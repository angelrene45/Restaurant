from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()


@router.get("/", response_model=List[schemas.Layout])
def read_layouts(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve layouts
    """
    layouts = crud.layout.get_multi(db, skip=skip, limit=limit)
    return layouts


@router.get("/{layout_id}", response_model=schemas.Layout)
def read_layout_by_id(
    layout_id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get a specific layout by id.
    """
    layout = crud.layout.get(db, id=layout_id)
    if not layout:
        raise HTTPException(
            status_code=400, detail="The layout doesn't exists"
        )
    return layout


@router.post("/", response_model=schemas.Layout)
def create_layout(
    *,
    db: Session = Depends(deps.get_db),
    layout_in: schemas.LayoutCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new layout system by admin.
    """
    layout = crud.layout.get_by_name(db, name=layout_in.name)
    if layout:
        raise HTTPException(
            status_code=400,
            detail="The layout name already exists in the system",
        )
    layout = crud.layout.create(db, obj_in=layout_in)
    return layout


@router.put("/{layout_id}", response_model=schemas.Layout)
def update_layout(
    *,
    db: Session = Depends(deps.get_db),
    layout_id: int,
    layout_in: schemas.LayoutUpdate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update a layout.
    """
    layout = crud.layout.get_by_name(db, name=layout_in.name)
    if layout:
        raise HTTPException(
            status_code=400,
            detail="The layout name already exists in the system",
        )
    layout = crud.layout.get(db, id=layout_id)
    if not layout:
        raise HTTPException(
            status_code=400, detail="The Layout doesn't exist"
        )
    layout_updated = crud.layout.update(db, db_obj=layout, obj_in=layout_in)
    return layout_updated