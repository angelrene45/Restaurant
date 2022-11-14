from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from fastapi import WebSocketDisconnect

from app.core.config import settings
from app.schemas.user import UserCreate
from app.schemas.customer import CustomerCreate
from app.models.user import RolUser
from app import crud, schemas

def test_ws_orders(
    client: TestClient, db: Session
) -> None:
    # create user
    email = "test_employee@test.com"
    password = "test"
    user_in = UserCreate(username="", email=email, password=password, role=RolUser.cook)
    crud.user.create(db=db, obj_in=user_in)
    data = {"username": email, "password": password}
    r = client.post(f"{settings.API_V1_STR}/login/access-token", data=data)
    data = r.json()
    token = data["access_token"]

    # test web socket
    with client.websocket_connect(f"/ws/v1/orders/read?token={token}") as websocket:
        data = websocket.receive_json()
        assert data == {"msg": "Connected"}
        websocket.send_json({"name":"shrimp", "quantity": 10, "price": 2})
        data = websocket.receive_json()
        assert len(data) > 0


def test_ws_orders_invalid_token(
    client: TestClient, db: Session
) -> None:
    # no token in params
    try:
        with client.websocket_connect("/ws/v1/orders/read") as websocket:
            pass
    except WebSocketDisconnect as e:
        assert e.code == 1008
        assert e.reason == 'no token in params'

    # invalid token
    try:
        with client.websocket_connect("/ws/v1/orders/read?token=invalid_token") as websocket:
            pass
    except WebSocketDisconnect as e:
        assert e.code == 1008
        assert e.reason == 'Could not validate credentials'

    # create customer (user can't access to ws)
    email = "customer@test.com"
    password = "test"
    user_in = CustomerCreate(username="", email=email, password=password)
    crud.customer.create(db=db, obj_in=user_in)
    data = {"username": email, "password": password, "user_type": schemas.UserTypeEnum.customer}
    r = client.post(f"{settings.API_V1_STR}/login/access-token", data=data)
    data = r.json()
    token = data["access_token"]
    # put customer token
    try:
        with client.websocket_connect(f"/ws/v1/orders/read?token={token}") as websocket:
            pass
    except WebSocketDisconnect as e:
        assert e.code == 1008
        assert e.reason == 'Could not validate credentials'
        
      

