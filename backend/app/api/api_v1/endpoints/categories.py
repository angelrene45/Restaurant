from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()


@router.get("/open", response_model=List[schemas.Category])
def read_categories_open(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve categories.
    """
    categories = crud.category.get_multi(db, skip=skip, limit=limit)
    return categories

@router.get("/open/{category_id}", response_model=schemas.Category)
def read_category_by_id_open(
    category_id: int,
    db: Session = Depends(deps.get_db)
) -> Any:
    """
    Get a specific category by id.
    """
    category = crud.category.get(db, id=category_id)
    if not category:
        raise HTTPException(
            status_code=400, detail="The category doesn't exists"
        )
    return category

@router.post("/", response_model=schemas.Category)
def create_category_being_admin(
    *,
    db: Session = Depends(deps.get_db),
    category_in: schemas.CategoryCreate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Create new category system by admin.
    """
    category = crud.category.get_by_name(db, name=category_in.name)
    if category:
        raise HTTPException(
            status_code=400,
            detail="The category name already exists in the system",
        )
    category = crud.category.create(db, obj_in=category_in)
    return category

@router.put("/{category_id}", response_model=schemas.Category)
def update_category_being_admin(
    *,
    db: Session = Depends(deps.get_db),
    category_id: int,
    category_in: schemas.CategoryUpdate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update a category.
    """
    category = crud.category.get(db, id=category_id)
    if not category:
        raise HTTPException(
            status_code=400, detail="The Category doesn't exist"
        )
    category_updated = crud.category.update(db, db_obj=category, obj_in=category_in)
    return category_updated