import json 
from typing import Union 
from fastapi import (
    APIRouter,
    Depends,
    WebSocket,
    WebSocketDisconnect
)
from sqlalchemy import select
from pydantic import parse_obj_as
from app.api.deps import authorize_ws_token_data
from app import schemas, models
from app.db.session import database_async


class BoardsConnectionManager:
    """
        Handle Logic from Boards in Web Sockets 

        Events Backend:
            msg: when receive message from web socket
                {"type": "msg", "data": <message-body>}

            get: get all current boards status
                {"type": "get", "data": {"board_id": <id>, "status": <status>} }

            update: when status board was changed ["available", "busy", "reserved", "not_available"]
                {"type": "update", "data": {"board_id": <id>, "status": <status>} }
                

        Events Frontend:
            broadcast: when receives dictionary of board with their status 
                {"type": "broadcast", "data": {"<board_id>": <status>} }

        Json Structure:
    """
    def __init__(self):
        self.active_connections: list[WebSocket] = []
        self.boards: dict = {
            "1":"available", 
            "2":"available", 
            "3":"available", 
        }

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    def change_status_board(self, data: dict):
        board_id = data.get("board_id")
        status = data.get("status")
        self.boards.update({board_id: status})

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_json({"type": "msg", "data": message})

    async def broadcast(self):
        """
            Send all current status from boards to active socket connections
        """
        # Notify all websockets clients new order arrives
        for connection in self.active_connections:
            await connection.send_json({"type": "broadcast", "data": self.boards})


manager_boards = BoardsConnectionManager()
router = APIRouter()


@router.websocket("/")
async def handle_boards(
    websocket: WebSocket, 
    # is_authorize: Union[str, None] = Depends(authorize_ws_token_data),
):
    # if not is_authorize: return 
    await manager_boards.connect(websocket)
    await manager_boards.send_personal_message("Connected", websocket)
    await manager_boards.broadcast()
    print(f"Active connections: {len(manager_boards.active_connections)}")
    try:
        while True:
            # waiting for new messages arrives from sockets clients
            data = await websocket.receive_json()
            # check type of message
            if data.get('type') == 'get':
                await manager_boards.broadcast()
            if data.get('type') == 'update':
                manager_boards.change_status_board(data.get("data", {}))
                await manager_boards.broadcast()
    except WebSocketDisconnect:
        manager_boards.disconnect(websocket)
        await manager_boards.broadcast()
        print(f"Active connections: {len(manager_boards.active_connections)}")