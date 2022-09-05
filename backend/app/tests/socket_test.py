import asyncio
import socketio

from fastapi import FastAPI

app = FastAPI()

_sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
_app = socketio.ASGIApp(socketio_server=_sio, socketio_path="/api/socket.io")
app.sio = _sio
app.mount("/ws", _app)
# sio.register_namespace(ws.ConnectNS('/'))

# Server events
@app.sio.event
async def connect(sid, environ, auth):
    print('connect ', sid)
    await app.sio.emit('lobby', {'user': 'rene'})

@app.sio.event
async def message_chat(sid, data):
    print(f'message_chat from {sid}: {data}')

def start_server():
    import asyncio
    from uvicorn import Config, Server
    config = Config(app, host='127.0.0.1', port=5000)
    server = Server(config=config)
    config.setup_event_loop()
    server_task = server.serve()
    asyncio.ensure_future(server_task)
    return server_task

# Client events
client = socketio.AsyncClient()

async def run_client():
    await client.connect('ws://127.0.0.1:5000', socketio_path="/ws/api/socket.io")
    await client.emit('message_chat', {'data': 'Hello Rene'})
    await asyncio.sleep(5)
    await client.disconnect()
    await client.wait()

@client.event
async def lobby(data: dict):
    print('message received with ', data)


start_server()
loop = asyncio.get_event_loop()
loop.run_until_complete(run_client())
