from typing import Any, Dict, Optional, Union

from sqlalchemy.orm import Session
from sqlalchemy.sql import func

from app.core.security import get_password_hash, verify_password
from app.crud.base import CRUDBase
from app.models.customer import Customer
from app.schemas.customer import CustomerCreate, CustomerUpdate


class CRUDCustomer(CRUDBase[Customer, CustomerCreate, CustomerUpdate]):
    def get_by_email(self, db: Session, *, email: str) -> Optional[Customer]:
        return db.query(Customer).filter(Customer.email == email).first()

    def get_by_mobile(self, db: Session, *, mobile: str) -> Optional[Customer]:
        if not mobile: return None
        return db.query(Customer).filter(Customer.mobile == mobile).first()

    def create(self, db: Session, *, obj_in: CustomerCreate) -> Customer:
        db_obj = Customer(
            email=obj_in.email,
            mobile=obj_in.mobile,
            hashed_password=get_password_hash(obj_in.password),
            first_name=obj_in.first_name,
            last_name=obj_in.last_name,
            is_active=obj_in.is_active,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: Customer, obj_in: Union[CustomerUpdate, Dict[str, Any]]
    ) -> Customer:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        if "password" in update_data:
            hashed_password = get_password_hash(update_data["password"])
            del update_data["password"]
            update_data["hashed_password"] = hashed_password
        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def update_lastlogin(self, db: Session, *, db_obj: Customer) -> Customer:
        db_obj.last_login = func.current_timestamp()
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def authenticate(self, db: Session, *, email: str, password: str) -> Optional[Customer]:
        customer = self.get_by_email(db, email=email)
        if not customer:
            return None
        if not verify_password(password, customer.hashed_password):
            return None
        return customer

    def is_active(self, customer: Customer) -> bool:
        return customer.is_active


customer = CRUDCustomer(Customer)