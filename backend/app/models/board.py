from sqlalchemy import ForeignKey, Column, Integer, String, DateTime, Boolean, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base_class import Base


class Board(Base):
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    layout_id = Column(Integer, ForeignKey("layout.id"))
    name = Column(String, index=True, unique=True, nullable=False)
    capacity = Column(Integer, nullable=False)
    can_smoke = Column(Boolean, default=False)
    position = Column(JSON, nullable=True)
    qr = Column(String, nullable=True)
    created_date = Column(DateTime, server_default=func.now())
    updated_date = Column(DateTime, server_default=func.now(), onupdate=func.current_timestamp())