"""
    Start the server:
        uvicorn main:app --reload
"""
from fastapi import FastAPI
from fastapi.responses import HTMLResponse, RedirectResponse

from fastapi_socketio import SocketManager

app = FastAPI()
socket_manager = SocketManager(app=app)

html = """
        <!DOCTYPE html>
        <html>
            <head>
                <title>Chat</title>
            </head>
            <body>
                <h1>Socket IO Chat</h1>
                <form action="" onsubmit="sendMessage(event)">
                    <input type="text" id="messageText" autocomplete="off"/>
                    <button>Send</button>
                </form>
                <ul id='messages'>
                </ul>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.0.1/socket.io.js" integrity="sha512-q/dWJ3kcmjBLU4Qc47E4A9kTB4m3wuTY7vkFJDTZKjTs8jhyGQnaUrxa0Ytd0ssMZhbNua9hE+E7Qv1j+DyZwA==" crossorigin="anonymous"></script>
                <script type="text/javascript" charset="utf-8">
                    var socket = io('ws://localhost:8000', { path: '/ws/socket.io' });
                    socket.on('connect', function() {
                        socket.emit('my event', {data: 'Im connected!'});
                    });
                </script>
            </body>
        </html>
"""

@app.get("/")
async def get():
    # return HTMLResponse(html)
    return RedirectResponse(url='/docs')

@app.sio.event
async def connect(sid, environ, auth):
    print('connect ', sid)
    await app.sio.emit('lobby', 'User joined')