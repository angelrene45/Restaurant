import os
import uuid
import pathlib
import shutil

from fastapi import UploadFile, HTTPException
from app.core.config import settings


def store_image_in_static_path(file: UploadFile) -> str:
    """
        Store the image in static path 
        return the url for public requests
    """
    extension_file = pathlib.Path(file.filename).suffix
    name_file = f"{uuid.uuid1()}{extension_file}"
    out_image_path = os.path.join("static", "foods", name_file)

    # save file original
    with open(out_image_path, "wb") as out_file:
        shutil.copyfileobj(file.file, out_file)

    # create the public url 
    url_image = os.path.join(
        f"{settings.SERVER_HOST}:{settings.BACKEND_PORT}", 
        out_image_path)

    return url_image


def delete_image_in_static_path(image_url: str) -> bool:
    """
        Delete the image in static path 
    """
    if not image_url: return True
    name_file = pathlib.Path(image_url).name
    out_image_path = os.path.join("static", "foods", name_file)
    if not os.path.exists(out_image_path): return True
    try:
        os.remove(out_image_path)
        return True
    except Exception as e:
        msg = f"Error when try to delete file\n" \
              f"File: {out_image_path}\n" \
              f"Traceback: {e}"
        print(msg)
        raise HTTPException(
            status_code=400, detail="Can't remove file"
        )