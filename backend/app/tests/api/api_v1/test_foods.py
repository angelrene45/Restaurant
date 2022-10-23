import json

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import crud
from app.core.config import settings
from app.schemas.food import FoodCreate
from app.tests.utils.utils import random_lower_string, random_float, random_integer
from app.tests.utils.food import create_random_food, create_random_food_units, create_random_food_variants, create_random_image_in_memory
from app.tests.utils.category import create_random_category


def test_create_foods_being_admin(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:
    # create  random categories in database
    categories_db = [create_random_category(db) for _ in range(3)]

    # prepare data from food 
    categories = [{"id": category.id} for category in categories_db]
    variants = create_random_food_variants(n=5, as_dict=True)
    units = create_random_food_units(n=2, as_dict=True)
    data_food = {
        "name": random_lower_string(),
        "description": random_lower_string(),
        "variants": variants,
        "units": units,
        "categories": categories,
        "is_active": True,
    }
    data_json = json.dumps(data_food)
    data_api = {
        "food_in" : data_json
    }
    r = client.post(
        f"{settings.API_V1_STR}/foods/", headers=superuser_token_headers, data=data_api
    )
    created_food = r.json()
    assert r.status_code == 200
    assert created_food
    assert created_food.get("is_active") == True
    assert created_food.get("name") == data_food.get("name")
    assert len(created_food.get("variants")) == 5
    assert len(created_food.get("units")) == 2
    assert len(created_food.get("categories")) == 3

    
def test_create_foods_with_image_being_admin(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:
    # create random image and get bytes 
    variant_1 = create_random_image_in_memory()
    variant_2 = create_random_image_in_memory()
    # set files info with content type
    files = [
        ('files', ("variant_1.png", variant_1, 'image/png')), 
        ('files', ("variant_2.png", variant_2, 'image/png'))
        ]
    # Put variants with linked name
    variants = [{"name":"variant 1", "image":"variant_1.png"}, {"name":"variant 2", "image":"variant_2.png"}]
    # Prepare data food
    data_food = {
        "name": random_lower_string(),
        "description": random_lower_string(),
        "variants": variants,
        "units": [],
        "categories": [],
        "is_active": True,
    }
    # convert dict into json string
    data_json = json.dumps(data_food)
    # final data for api call
    data_api = {
        "food_in" : data_json
    }
    # execute api call
    r = client.post(
        f"{settings.API_V1_STR}/foods/", headers=superuser_token_headers, data=data_api, files=files
    )
    created_food = r.json()

    assert r.status_code == 200
    assert created_food
    assert created_food.get("is_active") == True
    assert created_food.get("name") == data_food.get("name")
    assert len(created_food.get("variants")) == 2
    assert len(created_food.get("units")) == 0
    assert len(created_food.get("categories")) == 0

    # iterate over each variant and check image is available for download
    for variant in created_food.get("variants"):
        image_url = variant.get("image")
        r = client.get(image_url)
        assert r.status_code == 200
        assert r.headers.get("content-type") == "image/png"


def test_create_foods_with_bad_format_image_being_admin(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:
    """
        Upload image in food is only throught api
    """
    variant_1 = create_random_image_in_memory()
    variant_2 = create_random_image_in_memory()
    files = [
        ('files', ("variant_1.txt", variant_1, 'image/txt')), 
        ('files', ("variant_2.txt", variant_2, 'image/txt'))
        ]
    variants = [{"name":"variant 1", "image":"variant_1.txt"}, {"name":"variant 2", "image":"variant_2.txt"}]
    data_food = {
        "name": random_lower_string(),
        "description": random_lower_string(),
        "variants": variants,
        "units": [],
        "categories": [],
        "is_active": True,
    }
    data_json = json.dumps(data_food)
    data_api = {
        "food_in" : data_json
    }
    r = client.post(
        f"{settings.API_V1_STR}/foods/", headers=superuser_token_headers, data=data_api, files=files
    )
    assert r.status_code == 400


def test_get_foods_open(
    client: TestClient, db: Session
) -> None:
    create_random_food(db)
    create_random_food(db)
    r = client.get(f"{settings.API_V1_STR}/foods/open")
    all_foods = r.json()
    assert all_foods
    assert len(all_foods) > 1
    for food in all_foods:
        assert "name" in food
        assert "description" in food
        assert "is_active" in food
        assert food.get("is_active") is True
        assert isinstance(food.get("variants"), list)
        assert isinstance(food.get("units"), list)
        assert isinstance(food.get("categories"), list)


def test_get_existing_food_open(
    client: TestClient, db: Session
) -> None:
    food = create_random_food(db)
    food_id = food.id
    r = client.get(f"{settings.API_V1_STR}/foods/open/{food_id}")
    food = r.json()
    assert "name" in food
    assert "description" in food
    assert "is_active" in food
    assert food.get("is_active") is True
    assert isinstance(food.get("variants"), list)
    assert isinstance(food.get("units"), list)
    assert isinstance(food.get("categories"), list)


def test_update_food_being_admin(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:
    # create food in databse
    food_created = create_random_food(db)
    food_id = food_created.id
    categories_db = [create_random_category(db) for _ in range(3)]

    # prepare data for update
    categories = [{"id": category.id} for category in categories_db]
    variants = create_random_food_variants(n=5, as_dict=True)
    units = create_random_food_units(n=4, as_dict=True)
    data_food = {
        "name": random_lower_string(),
        "description": random_lower_string() ,
        "variants": variants,
        "units": units,
        "categories": categories,
        "discount": random_integer(),
        "is_active": False,
    }
    data_json = json.dumps(data_food)
    data_api = {
        "food_in" : data_json
    }
    # call api that update data
    r = client.put(
        f"{settings.API_V1_STR}/foods/{food_id}", headers=superuser_token_headers, data=data_api,
    )
    food_updated = r.json()
    assert r.status_code == 200
    assert food_updated
    assert food_updated.get("is_active") == False
    assert food_updated.get("name") == data_food.get("name")
    assert len(food_updated.get("variants")) == 5
    assert len(food_updated.get("units")) == 4
    assert len(food_updated.get("categories")) == 3


def test_update_food_replace_image_being_admin(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:
    """
        Upload image in food is only throught api
    """
    # CREATE
    orignal_image_bytes = create_random_image_in_memory()
    files = [('files', ("original_image.png", orignal_image_bytes, 'image/png'))]
    variants = [{"name":"variant 1", "image":"original_image.png"}]
    data_food = {
        "name": random_lower_string(),
        "description": random_lower_string() ,
        "variants": variants,
        "units": [],
        "categories": [],
        "discount": random_integer(),
        "is_active": False,
    }
    data_json = json.dumps(data_food)
    data_api = {
        "food_in" : data_json
    }
    # create food throught api
    r = client.post(
        f"{settings.API_V1_STR}/foods/", headers=superuser_token_headers, data=data_api, files=files
    )
    food_created = r.json()
    food_id = food_created.get("id")
    original_file = food_created.get("variants")[0].get("image")
    # check exists original file
    assert client.get(original_file).status_code == 200
    
    # UPDATE
    # create new image that replace the original
    new_image_bytes = create_random_image_in_memory()
    files = [('files', ("new_image.png", new_image_bytes, 'image/png'))]
    variants = [{"name":"variant 1", "image":"new_image.png"}]
    data_food = {
        "name": random_lower_string(),
        "description": random_lower_string() ,
        "variants": variants,
        "units": [],
        "categories": [],
        "discount": random_integer(),
        "is_active": False,
    }
    data_json = json.dumps(data_food)
    data_api = {
        "food_in" : data_json
    }
    # update food throught api
    r = client.put(
        f"{settings.API_V1_STR}/foods/{food_id}", headers=superuser_token_headers, data=data_api, files=files
    )
    # check if update was success
    assert r.status_code == 200
    # get public url from new image
    food_updated = r.json()
    new_file = food_updated.get("variants")[0].get("image")
    # check exist the updated image
    assert client.get(new_file).status_code == 200
    # check if was removed the original image
    assert client.get(original_file).status_code == 404  