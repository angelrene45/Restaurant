from typing import Any

from fastapi import APIRouter, Depends
from pydantic.networks import EmailStr

from app import models, schemas
from app.api import deps
from app.utils import send_test_email, backup_database, restore_database

router = APIRouter()


@router.post("/test-email/", response_model=schemas.Msg, status_code=201)
def test_email(
    email_to: EmailStr,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Test emails.
    """
    send_test_email(email_to=email_to)
    return {"msg": "Test email sent"}


@router.post("/backup-db/", response_model=schemas.Msg)
def backup_db(
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Backup all database.
    """
    path_backup = backup_database(compress=False)
    return {"msg": path_backup}


@router.post("/restore-db/", response_model=schemas.Msg)
def restore_db(
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Restore all database.
    """
    restore_database()
    return {"msg": "restore success"}
