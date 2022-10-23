import enum
from sqlalchemy import Boolean, Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import ENUM
from sqlalchemy.sql import func

from app.db.base_class import Base

class RolUser(enum.Enum):
    admin = "admin"
    hostess = "hostess"
    waiter = "waiter"
    cook = "cook"
<<<<<<< Updated upstream
    employee = "employee"

=======
    client = "client"
>>>>>>> Stashed changes

class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    mobile = Column(String, unique=True, index=True)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean(), default=True)
<<<<<<< Updated upstream
    role = Column(ENUM(RolUser), default=RolUser.employee)
    last_login = Column(DateTime)
=======
    role = Column(ENUM(RolUser), default=RolUser.client)
>>>>>>> Stashed changes
    created_date = Column(DateTime, server_default=func.now())
    updated_date = Column(DateTime, server_default=func.now(), onupdate=func.current_timestamp())