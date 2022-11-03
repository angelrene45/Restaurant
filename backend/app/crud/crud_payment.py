from typing import Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.payment import Payment
from app.schemas.payment import PaymentCreate, PaymentUpdate


class CRUDPayment(CRUDBase[Payment, PaymentCreate, PaymentUpdate]):
    def get_by_name(self, db: Session, *, name: str) -> Optional[Payment]:
        return db.query(Payment).filter(Payment.name == name).first()

payment = CRUDPayment(Payment)