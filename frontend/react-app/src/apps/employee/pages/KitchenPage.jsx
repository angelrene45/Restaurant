import { useEffect, useState } from "react";

import { CardKitchen } from "../layout";


export const KitchenPage = (props) => {

  const [orders, setOrders] = useState([]);
  const [webSocketReady, setWebSocketReady] = useState(false);
  const [webSocket, setWebSocket] = useState(null);

  // handle websocket events
  useEffect(() => {
    // connect to web socket 
    const ws = new WebSocket("ws://localhost:8000/ws/v1/orders/")

    // event when websocket is opened
    ws.onopen = (event) => {
      setWebSocketReady(true)
      // request get all orders
      const msg = { type: "RequestAll" }
      ws.send(JSON.stringify(msg));
    }

    // event to listen new message on real time
    ws.onmessage = function (event) {
      // console.log("new socket message", event.data)
      const { type, data } = JSON.parse(event.data)
      if (type === 'SendAll') setOrders(data)
    }

    // set state 
    setWebSocket(ws)

    // clean up when user close the page
    return () => {
      // uncomment this on production mode
      // ws.close();
    }
  }, []);

  console.log(orders)

  return (
      <div className="flex flex-col h-[calc(100vh-64px)] w-full bg-white">

        {/* Header */}
        <div className="items-center justify-between  border-b border-slate-200 px-4 sm:px-6 md:px-5 h-16">
          <span className="inline-grid grid-cols-4 gap-6 p-2">
            <span>KITCHEN</span>
            <span>{orders.length} Orders</span>
            <span>{orders.length} New</span>
            <span>{orders.length} Preparing</span>
          </span>
        </div>

        {/* Body */}
        <div className="px-1 py-4">
          <CardKitchen orders={orders} />
        </div>


        {/* Footer */}
        <div className="items-center justify-between border-t border-slate-200 px-4 sm:px-6 md:px-5 h-16">
          <span className="inline-grid grid-cols-2 gap-3 p-2">
            <span>Active orders</span>
            <span>History</span>
          </span>
        </div>
      </div>
  )
};