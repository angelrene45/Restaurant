from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()


@router.get("/open", response_model=List[schemas.Setting])
def read_settings_open(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve settings.
    """
    settings = crud.setting.get_multi(db, skip=skip, limit=limit)
    return settings


@router.get("/open/{setting_name}", response_model=schemas.Setting)
def read_setting_by_name_open(
    setting_name: str,
    db: Session = Depends(deps.get_db)
) -> Any:
    """
    Get a specific setting by name.
    """
    setting = crud.setting.get_by_name(db, name=setting_name)
    if not setting:
        raise HTTPException(
            status_code=400, detail="The setting name doesn't exists"
        )
    return setting


@router.post("/", response_model=schemas.Setting)
def create_setting_being_admin(
    *,
    db: Session = Depends(deps.get_db),
    setting_in: schemas.SettingCreate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Create new setting system by admin.
    """
    setting = crud.setting.get_by_name(db, name=setting_in.name)
    if setting:
        raise HTTPException(
            status_code=400,
            detail="The setting name already exists in the system",
        )
    setting = crud.setting.create(db, obj_in=setting_in)
    return setting


@router.put("/{setting_name}", response_model=schemas.Setting)
def update_setting_being_admin(
    *,
    db: Session = Depends(deps.get_db),
    setting_name: str,
    setting_in: schemas.SettingUpdate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update a setting.
    """
    setting = crud.setting.get_by_name(db, name=setting_in.name)
    if setting:
        raise HTTPException(
            status_code=400,
            detail="The setting name already exists in the system",
        )
    setting = crud.setting.get_by_name(db, name=setting_name)
    if not setting:
        raise HTTPException(
            status_code=400, detail="The Setting doesn't exist"
        )
    setting_updated = crud.setting.update(db, db_obj=setting, obj_in=setting_in)
    return setting_updated