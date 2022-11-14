from typing import Union 
from fastapi import (
    APIRouter,
    Depends,
    WebSocket,
    WebSocketDisconnect
)

from app.api.deps import authorize_ws_token_data


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []
        self.active_orders: list = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    def add_new_order(self, order: dict):
        self.active_orders.append(order)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_json({"msg": message})

    async def broadcast(self):
        """
            Sent all current orders to active connections
        """
        for connection in self.active_connections:
            await connection.send_json(self.active_orders)


manager = ConnectionManager()
router = APIRouter()


@router.websocket("/read")
async def read_orders(
    websocket: WebSocket, 
    is_authorize: Union[str, None] = Depends(authorize_ws_token_data),
):
    await manager.connect(websocket)
    await manager.send_personal_message("Connected", websocket)
    try:
        while True:
            data = await websocket.receive_json()
            manager.add_new_order(data)
            await manager.send_personal_message(f"Your add new order", websocket)
            await manager.broadcast()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"User Disconnect", websocket)