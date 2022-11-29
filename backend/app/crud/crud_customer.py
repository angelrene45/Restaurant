from typing import Any, Dict, Optional, Union

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from sqlalchemy.sql import func

from app.core.security import get_password_hash, verify_password
from app.crud.base import CRUDBase
from app.models.customer import Customer, Customer_Address
from app.schemas.customer import CustomerCreate, CustomerUpdate


class CRUDCustomer(CRUDBase[Customer, CustomerCreate, CustomerUpdate]):
    def get_by_email(self, db: Session, *, email: str) -> Optional[Customer]:
        return db.query(Customer).filter(Customer.email == email).first()

    def get_by_mobile(self, db: Session, *, mobile: str) -> Optional[Customer]:
        if not mobile: return None
        return db.query(Customer).filter(Customer.mobile == mobile).first()

    def create(self, db: Session, *, obj_in: CustomerCreate) -> Customer:
        # map schemas pydantic to sqlalchemy model
        addresses = [Customer_Address(**address.dict()) for address in obj_in.addresses]

        db_obj = Customer(
            email=obj_in.email,
            mobile=obj_in.mobile,
            addresses=addresses,
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
        # map schemas pydantic to sqlalchemy model
        addresses = [Customer_Address(**address.dict()) for address in obj_in.addresses]
        obj_data = jsonable_encoder(db_obj)
        update_data = obj_in.dict(exclude_unset=True)

        # if update the password, needs to hashed
        if "password" in update_data and update_data.get("password"):
            hashed_password = get_password_hash(update_data["password"])
            del update_data["password"]
            update_data["hashed_password"] = hashed_password

        # update all values except relationships
        for field in obj_data:
            if field in update_data and field not in ["addresses"]:
                setattr(db_obj, field, update_data[field])

        # set relation
        db_obj.addresses = addresses

        # update
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


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