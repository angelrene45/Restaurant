import { useEffect, useState } from "react";

import { CardsKitchen } from "../layout";
import { Loading } from "../../../components/items/Spinner";
import { StatusOrder } from "../../../utils";


export const KitchenPage = (props) => {

  const [isLoading, setIsLoading] = useState(true);
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
      if (type === 'SendAll') {
        // sort foods
        setOrders(data)
        setIsLoading(false)
      }
    }

    // set state 
    setWebSocket(ws)

    // clean up when user close the page
    return () => {
      // uncomment this on production mode
      // ws.close();
    }
  }, []);

  // selected tab page
  const classSelected = "block pb-3 text-indigo-500 whitespace-nowrap border-t-2 border-indigo-500"
  const classUnSelected = "block pb-3 text-slate-500 hover:text-slate-600 whitespace-nowrap"
  const [selectedTabPage, setSelectedTabPage] = useState('Kitchen') // first category selected
  const tabsPages = ['Kitchen', 'Drinks', 'History']

  // get counters for every status 
  const countByStatus = orders.reduce((acc, order) => {
    switch (order.status) {
      case StatusOrder.new:
        acc.new += 1;
        break;
      case StatusOrder.preparing:
        acc.preparing += 1;
        break;
      default:
        acc.completed += 1;
        break;
    }
    return acc;
  }, { new: 0, preparing: 0, completed: 0 });

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full bg-white">

      {/* Header */}
      <div className="items-center justify-between  border-b border-slate-200 px-4 sm:px-6 md:px-5 h-16">
        <span className="inline-grid grid-cols-5 gap-6 p-2">
          <span>KITCHEN</span>
          <span>{countByStatus.new} New</span>
          <span>{countByStatus.preparing} Preparing</span>
          <span>{countByStatus.completed} Completed</span>
          <span>{orders.length} Total Orders</span>
        </span>
      </div>

      {/* Body */}
      <div className="px-1 py-4">
        {isLoading ? <Loading /> : <CardsKitchen orders={orders} tabName={selectedTabPage} />}
      </div>


      {/* Footer */}
      <div className="items-center justify-between border-t border-slate-200 px-4 sm:px-6 md:px-5 h-16">
        <div className="relative mb-8">
          {/* <div className="absolute bottom-0 w-full h-px bg-slate-200" aria-hidden="true"></div> */}
          <ul className="relative text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar">
            {tabsPages.map((tabName, index) => (
              <li
                key={index}
                className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8 cursor-pointer"
              >
                <span
                  className={tabName === selectedTabPage ? classSelected : classUnSelected}
                  onClick={() => { setSelectedTabPage(tabName) }}
                >
                  {tabName}
                </span>
              </li>
            ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
};