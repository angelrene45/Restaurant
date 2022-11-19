from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from fastapi import WebSocketDisconnect

from app.core.config import settings
from app.schemas.user import UserCreate
from app.schemas.customer import CustomerCreate
from app.models.user import RolUser
from app import crud, schemas

def test_ws_boards(
    client: TestClient, db: Session
) -> None:
    # test web socket
    with client.websocket_connect(f"/ws/v1/boards/") as websocket:
        # get msg that client is connected
        data = websocket.receive_json()
        assert data == {"type": "msg", "data": "Connected"}
        # get msg broadcast 
        data = websocket.receive_json()
        assert data == {"type": "broadcast", "data": {}}

        # change status from board
        websocket.send_json({"type": "update", "data": {"board_id": 1, "status": "available"} })
        # wait for new msg 
        data = websocket.receive_json()
        assert "type" in data
        assert "data" in data
        assert data.get("type") == 'broadcast'
        assert len(data.get("data")) > 0

        # change status from another board
        websocket.send_json({"type": "update", "data": {"board_id": 2, "status": "not_available"} })
        data = websocket.receive_json()
        assert len(data.get("data")) > 0
