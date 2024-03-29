import os
import json
import io

import requests
from fastapi import UploadFile
from sqlalchemy.orm import Session

from app import crud, schemas, models
from app.core.config import settings
from app.utils.image import store_image_in_static_path

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

    # get path from json pre_data
    path_assets = os.path.join("app", "utils", "pre_data")

    # load settings 
    path_settings = os.path.join(path_assets, "settings.json")
    with open(path_settings) as json_file:
        list_settings = json.load(json_file)
        for data_setting in list_settings:
            setting = crud.setting.get_by_name(db=db, name=data_setting.get("name"))
            if setting: continue
            setting_in = schemas.SettingCreate(
                name=data_setting.get("name"), 
                value=data_setting.get("value")
            )
            crud.setting.create(db, obj_in=setting_in)


    # Load categories
    path_categories = os.path.join(path_assets, "categories.json")
    with open(path_categories) as json_file:
        list_categories = json.load(json_file)
        for data_category in list_categories:
            category = crud.category.get_by_name(db=db, name=data_category.get("name"))
            if category: continue
            category_in = schemas.CategoryCreate(
                name=data_category.get("name"),
                color=data_category.get("color")
            )
            crud.category.create(db, obj_in=category_in)

    # Load foods
    path_foods = os.path.join(path_assets, "foods.json")
    with open(path_foods) as json_file:
        list_foods = json.load(json_file)
        for num, data_food in enumerate(list_foods, start=1):
            food = crud.food.get_by_name(db=db, name=data_food.get("name"))
            if food: continue
            if not data_food.get("name"): continue
            categories = [crud.category.get_by_name(db=db, name=category_name) for category_name in data_food.get("categories") if crud.category.get_by_name(db=db, name=category_name) is not None]
            
            # Upload images
            variants = data_food.get("variants", [])
            for variant in variants:
                image = variant.get("image", None)
                if not image: continue
                # download the image from url
                response = requests.get(image)
                if response.status_code != 200: continue
                # convert to bytes io
                bytes_io = io.BytesIO(response.content)
                # instance of UploadFile
                file = UploadFile(
                    filename="test.jpg",
                    file = bytes_io,
                    content_type="image/jpg",
                )
                public_url = store_image_in_static_path(file) if file else None
                variant["image"] = public_url

            # create food
            food_in = schemas.FoodCreate(
                name=data_food.get("name"),
                description=data_food.get("description"),
                variants=data_food.get("variants"),
                units=data_food.get("units"),
                discount=data_food.get("discount"),
                is_active=data_food.get("is_active"),
            )
            
            print("*"*50)
            print(f"{num}/{len(list_foods)}")
            crud.food.create(db, obj_in=food_in, categories_db=categories)