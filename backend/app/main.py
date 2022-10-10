"""
    Start the server:
        uvicorn main:app --reload
"""
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, RedirectResponse

from fastapi_socketio import SocketManager

from app.api.api_v1.api import api_router
from app.api.sockets_v1 import UserNamespace
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME, openapi_url=f"{settings.API_V1_STR}/openapi.json"
)
socket_manager = SocketManager(app=app)

# set all socket io namespaces
app.sio.register_namespace(UserNamespace('/user_si'))

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS: 
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# set all endpoints
app.include_router(api_router, prefix=settings.API_V1_STR)


### REMOVE LATER
html = """
        <!DOCTYPE html>
        <html>
            <head>
                <title>Chat</title>
            </head>
            <body>
                <h1>Socket IO Chat Test</h1>
                <form action="" onsubmit="sendMessage(event)">
                    <input type="text" id="messageText" autocomplete="off"/>
                    <button>Send</button>
                </form>
                <ul id='messages'>
                </ul>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.0.1/socket.io.js" integrity="sha512-q/dWJ3kcmjBLU4Qc47E4A9kTB4m3wuTY7vkFJDTZKjTs8jhyGQnaUrxa0Ytd0ssMZhbNua9hE+E7Qv1j+DyZwA==" crossorigin="anonymous"></script>
                <script type="text/javascript" charset="utf-8">
                    var socket = io('ws://localhost:8000/user_si', { path: '/ws/socket.io' });
                    socket.on('connect', function() {
                        socket.emit('msg', {data: 'Im connected!'});
                    });
                </script>
            </body>
        </html>
"""

from fastapi import Depends
from app.api.deps import reusable_oauth2
from app.db.init_db import init_db
from app.db.session import SessionLocal

@app.get("/")
async def get():
    # create super user if dont exists
    db = SessionLocal()
    init_db(db)
    return HTMLResponse(html)