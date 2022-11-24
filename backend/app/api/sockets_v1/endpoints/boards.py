import json 
from typing import Union 

import websockets
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

        Boards Events:
            SendMessage: when receive message from web socket
                {"type": "SendMessage", "data": <message-body>}

            RequestAllBoards: get all current boards status
                {"type": "RequestAllBoards", "data": {"board_id": <id>, "status": <status>} }

            RequestUpdateBoard: when status board was changed ["available", "busy", "reserved", "not_available"]
                {"type": "RequestUpdateBoard", "data": {"board_id": <id>, "status": <status>} }
                
            SendAllBoards: when receives dictionary of all boards with their status (Frontend Event)
                {"type": "send_all_boards", "data": {"<board_id>": <status>} }

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
        """
            Send simple message
        """
        await websocket.send_json({"type": "SendMessage", "data": message})

    async def send_all_boards(self):
        """
            Send all current status from boards to active socket connections
        """
        # Send to all websockets clients the boards status dictionary
        for connection in self.active_connections:
            try:
                await connection.send_json({"type": "SendAllBoards", "data": self.boards})
            except Exception as e:
                print(f"websocket error when try to send boards:\n {e}")
                # connection error and close 
                self.disconnect(connection)


manager_boards = BoardsConnectionManager()
router = APIRouter()


@router.websocket("/")
async def handle_boards(
    websocket: WebSocket, 
    # is_authorize: Union[str, None] = Depends(authorize_ws_token_data),
):
    # if not is_authorize: return 
    await manager_boards.connect(websocket)
    print(f"Active connections: {len(manager_boards.active_connections)}")
    try:
        while True:
            # waiting for new messages arrives from sockets clients
            data = await websocket.receive_json()
            # check type of message
            if data.get('type') == 'RequestAllBoards':
                await manager_boards.send_all_boards()
            if data.get('type') == 'RequestUpdateBoard':
                manager_boards.change_status_board(data.get("data", {}))
                await manager_boards.send_all_boards()
    except WebSocketDisconnect:
        manager_boards.disconnect(websocket)
        print(f"Active connections: {len(manager_boards.active_connections)}")