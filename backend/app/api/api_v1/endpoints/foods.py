from typing import Any, List, Optional

from fastapi import APIRouter, Body, Depends, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
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
    name: str = Body(...),
    description: str = Body(...),
    price: float = Body(...),
    categories: list = Body(..., description="Category id list"),
    discount: int = Body(default=..., gt=-1, lt=100),
    is_active: bool = Body(default=...),
    file: Optional[UploadFile] = Depends(deps.file_image_food),
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Create new food system by admin.
    """
    image = store_image_in_static_path(file) if file else None

    if categories and ',' in categories[0]: categories = categories[0].split(',') # fix problem with swagger UI
    categories_db = [crud.category.get(db, id=category_id) for category_id in categories if crud.category.get(db, id=category_id) is not None]

    food_in = schemas.FoodCreate(
        name=name, 
        description=description, 
        price=price, 
        discount=discount,
        image=image,
        is_active=is_active)
    food = crud.food.create(db, obj_in=food_in, categories_db=categories_db)

    crud.food.update_new_price(db, db_obj=food, user_id=current_user.id)

    return food

@router.put("/{food_id}", response_model=schemas.Food)
def update_food_being_admin(
    *,
    db: Session = Depends(deps.get_db),
    food_id: int,
    name: str = Body(...),
    description: str = Body(...),
    price: float = Body(...),
    categories: list = Body(..., description="Category id list"),
    discount: int = Body(default=..., gt=-1, lt=100),
    is_active: bool = Body(default=...),
    file: Optional[UploadFile] = Depends(deps.file_image_food),
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

    # check if is new file
    if file:
        delete_image_in_static_path(food.image)
        image = store_image_in_static_path(file)
    else:
        image = food.image

    food_in = schemas.FoodCreate(
        name=name, 
        description=description, 
        price=price, 
        discount=discount, 
        is_active=is_active,
        image=image)
    
    if categories and ',' in categories[0]: categories = categories[0].split(',') # fix problem with swagger UI
    categories_db = [crud.category.get(db, id=category_id) for category_id in categories if crud.category.get(db, id=category_id) is not None]

    current_price = food.price
    food_updated = crud.food.update(db, db_obj=food, obj_in=food_in, categories_db=categories_db)

    check_new_price = True if current_price != food_updated.price else False
    if check_new_price: crud.food.update_new_price(db, db_obj=food, user_id=current_user.id)

    return food_updated
