import socketio

class UserNamespace(socketio.AsyncNamespace):
    def on_connect(self, sid, environ):
        print(f"User {sid} connected to namespace: {self.namespace}")

    def on_disconnect(self, sid):
        pass

    async def on_msg(self, sid, data):
        print("*"*20, "Msg event", data)
        # await self.emit('msg_response', data)