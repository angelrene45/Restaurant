from typing import Any, List, Optional

from fastapi import APIRouter, Body, Depends, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.schemas.food import FoodCreate, FoodUpdate
from app.utils.image import store_image_in_static_path, delete_image_in_static_path

router = APIRouter()


@router.get("/open", response_model=List[schemas.Food])
def read_foods_open(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve foods.
    """
    foods = crud.food.get_multi(db, skip=skip, limit=limit)
    return foods


@router.get("/open/{food_id}", response_model=schemas.Food)
def read_food_by_id_open(
    food_id: int,
    db: Session = Depends(deps.get_db)
) -> Any:
    """
    Get a specific food by id.
    """
    food = crud.food.get(db, id=food_id)
    if not food:
        raise HTTPException(
            status_code=400, detail="The food doesn't exists"
        )
    return food


@router.post("/", response_model=schemas.Food)
def create_food_being_admin(
    *,
    db: Session = Depends(deps.get_db),
    food_in: FoodCreate = Body(...),
    files: Optional[List[UploadFile]] = Depends(deps.file_image_food),
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Create new food system by admin.
    """

    # upload images
    for file in files:
        # find variant linked with image file that has the same filename 
        variant = next((variant for variant in food_in.variants if variant.image == file.filename), None)
        if not variant: continue
        public_url = store_image_in_static_path(file) if file else None
        variant.image = public_url

    # get instance of existing model category
    categories_db = [crud.category.get(db, id=category.id) for category in food_in.categories if crud.category.get(db, id=category.id) is not None]
    # create food
    food = crud.food.create(db, obj_in=food_in, categories_db=categories_db)
    return food


@router.put("/{food_id}", response_model=schemas.Food)
def update_food_being_admin(
    *,
    db: Session = Depends(deps.get_db),
    food_id: int,
    food_in: FoodUpdate = Body(...),
    files: Optional[List[UploadFile]] = Depends(deps.file_image_food),
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update a food.
    """
    food = crud.food.get(db, id=food_id)
    if not food:
        raise HTTPException(
            status_code=400, detail="The Food doesn't exist"
        )

    # upload images
    for file in files:
        # find variant linked with image file that has the same filename 
        variant = next((variant for variant in food_in.variants if variant.image == file.filename), None)
        if not variant: continue
        # get current image url
        variant_db = crud.food.get_variant_by_name(db, food_id=food.id, name=variant.name)
        # delete the current image in variant
        delete_image_in_static_path(variant_db.image)
        # store new image
        public_url = store_image_in_static_path(file) if file else None
        variant.image = public_url

    # get instance of existing model category
    categories_db = [crud.category.get(db, id=category.id) for category in food_in.categories if crud.category.get(db, id=category.id) is not None]
    # update food
    food_updated = crud.food.update(db, db_obj=food, obj_in=food_in, categories_db=categories_db)
    return food_updated