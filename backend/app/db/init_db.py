from sqlalchemy.orm import Session

from app import crud, schemas, models
from app.core.config import settings

def init_db(db: Session) -> None:
    """
        Create the super user
    """
    user = crud.user.get_by_email(db, email=settings.FIRST_SUPERUSER)
    if not user:
        user_in = schemas.UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            role=models.user.RolUser.admin,
        )
        user = crud.user.create(db, obj_in=user_in)