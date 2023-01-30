import json 
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
from app.models.order import StatusOrder, TypesOrder
from app.db.session import database_async


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_json({"msg": message})

    async def send_all(self):
        """
            Sent all current orders to active connections
        """
        # prepare query async
        status = [StatusOrder.new, StatusOrder.preparing, StatusOrder.delivering]
        query = select(models.Order).where(models.Order.status.in_(status)).order_by(models.Order.id)
        # get order by today 
        result = await database_async.fetch_all(query=query)

        # iterate for every order and get the foods associate because database async library dont do that (we do manually)
        orders = []
        for order in result:
            # get foods related to the order
            query = select(models.Order_Food).where(order.id == models.Order_Food.order_id)
            foods = await database_async.fetch_all(query=query)
            order.foods = foods
            # order sqlalchemy model convert to pydantic schema 
            order = parse_obj_as(schemas.Order, order)
            # order foods by categories
            order_by_categories = {}
            for food in order.foods:
                order_by_categories.setdefault(food.category, []).append(food)
            # set the foods sorted by categories
            order.foods = order_by_categories
            # add to final list 
            orders.append(json.loads(order.json()))
      
        # Notify all websockets clients new order arrives
        for connection in self.active_connections:
            try:
                await connection.send_json({"type": "SendAll", "data": orders})
            except Exception as e:
                print(f"websocket error when try to send boards:\n {e}")
                # connection error and close 
                self.disconnect(connection)


manager = ConnectionManager()
router = APIRouter()


@router.websocket("/")
async def handle_boards(
    websocket: WebSocket, 
    # is_authorize: Union[str, None] = Depends(authorize_ws_token_data),
):
    # if not is_authorize: return 
    await manager.connect(websocket)
    print(f"Active connections: {len(manager.active_connections)}")
    try:
        while True:
            # waiting for new messages arrives from sockets clients
            data = await websocket.receive_json()
            # check type of message
            if data.get('type') == 'RequestAll':
                await manager.send_all()
            if data.get('type') == 'RequestUpdate':
                manager.change_status_board(data.get("data", {}))
                await manager.send_all()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        print(f"Active connections: {len(manager.active_connections)}")