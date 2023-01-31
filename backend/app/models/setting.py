from sqlalchemy import Column, JSON, String, DateTime
from sqlalchemy.sql import func

from app.db.base_class import Base


class Setting(Base):
    name = Column(String, primary_key=True, index=True)
    value = Column(JSON, nullable=True)
    created_date = Column(DateTime, server_default=func.now())
    updated_date = Column(DateTime, server_default=func.now(), onupdate=func.current_timestamp())