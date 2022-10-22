import os
import uuid
import pathlib
import shutil

import qrcode
from fastapi import UploadFile, HTTPException
from app.core.config import settings


def store_image_in_static_path(file: UploadFile) -> str:
    """
        Store the image in static path 
        return the url for public requests
    """
    extension_file = pathlib.Path(file.filename).suffix
    name_file = f"{uuid.uuid1()}{extension_file}"
    target_name = "tests" if os.getenv('TESTING', '') == 'True' else "foods"
    out_image_path = os.path.join("static", target_name, name_file)

    # save file original
    with open(out_image_path, "wb") as out_file:
        shutil.copyfileobj(file.file, out_file)

    # create the public url 
    url_image = os.path.join(
        f"http://{settings.SERVER_HOST}:{settings.BACKEND_PORT}", 
        out_image_path)

    return url_image


def delete_image_in_static_path(image_url: str) -> bool:
    """
        Delete the image in static path 
    """
    if not image_url: return True
    name_file = pathlib.Path(image_url).name
    target_name = "tests" if os.getenv('TESTING', '') == 'True' else "foods"
    out_image_path = os.path.join("static", target_name, name_file)
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


def generate_qr_board(id: int) -> str:
    """
        Generate Dinner Table QR code with url linked to Frontend
            - Check target name in static folder (if is test or normal)
            - add data with url linked to frontend
            
        return the public path where qrcode is stored
    """
    target_name = "tests" if os.getenv('TESTING', '') == 'True' else "boards"
    name_file = f"QR_{uuid.uuid1()}_{id}.png"
    out_image_path = os.path.join("static", target_name, name_file)
    features = qrcode.QRCode(version=1, box_size=10, border=2)
    features.add_data(f"Board with id: {id} (here is the url linked to frontend)")
    features.make(fit=True)
    img_qr = features.make_image(fill_color='black', back_color='white')
    img_qr.save(out_image_path)
    # create the public url 
    url_image = os.path.join(
        f"http://{settings.SERVER_HOST}:{settings.BACKEND_PORT}", 
        out_image_path)
    return url_image