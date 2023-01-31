from typing import Optional
from datetime import datetime

from pydantic import BaseModel

# Setting
class SettingBase(BaseModel):
    name: Optional[str] = None
    value: Optional[dict] = None

# Properties to receive via API on creation
class SettingCreate(SettingBase):
    name: str
    value: dict

# Properties to receive via API on update
class SettingUpdate(SettingBase):
    name: str
    value: dict


class SettingInDBBase(SettingBase):
    name: str
    value: dict

    class Config:
        orm_mode = True

# Additional properties to return via API
class Setting(SettingInDBBase):
    pass


# Additional properties stored in DB
class SettingInDB(SettingInDBBase):
    created_date: datetime
    updated_date: datetime