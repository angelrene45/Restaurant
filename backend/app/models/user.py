from enum import Enum
from sqlalchemy import Boolean, Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import ENUM
from sqlalchemy.sql import func

from app.db.base_class import Base

class RolUser(str, Enum):
    admin: str = "admin"
    hostess: str = "hostess"
    waiter: str = "waiter"
    cook: str = "cook"
    employee: str = "employee"
   
class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    mobile = Column(String, unique=True, index=True)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean(), default=True)
    role = Column(ENUM(RolUser), default=RolUser.employee)
    last_login = Column(DateTime)
    created_date = Column(DateTime, server_default=func.now())
    updated_date = Column(DateTime, server_default=func.now(), onupdate=func.current_timestamp())