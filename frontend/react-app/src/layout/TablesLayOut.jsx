import { useEffect, useState } from "react"

import greenTable from '../images/round-table.png'
import greenSquare from '../images/dinning-table.png'
import redTable from '../images/round-table-red.png'
import bar from '../images/cocktail.png'
import soda from '../images/soda-can.png'
import cocina from '../images/sarten.png'
import trash from '../images/eliminar.png'
import { getEnvVariables } from "../utils"

const TablesLayOut = () => {

  const [boards, setBoards] = useState({});
  const [webSocketReady, setWebSocketReady] = useState(false);
  const [webSocket, setWebSocket] = useState(null);

  const { SERVER_HOST, BACKEND_PORT } = getEnvVariables();

  // handle websocket events
  useEffect(() => {
    // connect to web socket 
    const ws = new WebSocket(`ws://${SERVER_HOST}:${BACKEND_PORT}/ws/v1/boards/`)
    
    // event when websocket is opened
    ws.onopen = (event) => {
      setWebSocketReady(true)
      // request get all boards
      const msg = { type: "RequestAllBoards" }
      ws.send(JSON.stringify(msg));
    }
    
    // event to listen new message on real time
    ws.onmessage = function (event) {
      console.log("new socket message", event.data)
      const {type, data} = JSON.parse(event.data)
      if (type === 'SendAllBoards') setBoards(data)
    }

    // set state 
    setWebSocket(ws)

    // clean up when user close the page
    return () => {
      // uncomment this on production mode
      // ws.close();
    }
  }, []);

  // when user click on board change the status 
  const updateStatusBoard = (board_id) => {
    let status = 'available'
    // put different status from current data 
    if (board_id in boards){
      const current_status = boards[board_id]
      if (current_status === "available") status = "not_available"
    }

    // sent event websocket and change table status
    if (webSocket){
      const msg = {
        type: "RequestUpdateBoard",
        data: {board_id, status}
      }
      webSocket.send(JSON.stringify(msg));
    } 
  }

  return (
    <div className='overflow-x-auto'>
        {/* Example socket */}
        {
          Object.keys(boards).map(key => 
            <div 
              key={key} 
              className='bg-gray' 
              onClick={() => updateStatusBoard(key)}
            >
              {
                (boards[key] === 'available') 
                ? <img src={greenTable}></img>
                : <img src={redTable}></img>
              }
              <h1>{boards[key]}</h1>
            </div>
          )
        }
        {/* Finish example socket */}
      
      <div className="grid grid-rows-10 grid-cols-15 bg-gray-300 shadow-2xl rounded-lg mx-auto text-center mt-4 mb-4" style={{ height:'800px', width: '1500px'}}>
        <div className='bg-gray-400 grid grid-cols-2 col-span-4 row-span-1 col-start-1 row-start-2'>
          <div className='col-span-1 row-span-1 flex items-center justify-center'>
            <img src={bar} style={{ width: "30px"}} alt=''></img> 
          </div>
          <div className='col-span-1 row-span-1 flex items-center justify-center'>
            <img src={soda} style={{ width: "30px"}} alt=''></img> 
          </div>
        </div>

        <div className='bg-gray-400 col-span-2 row-span-1 col-start-6 row-start-2 flex items-center justify-center'>
          <img src={cocina} style={{ width: "30px"}} alt=''></img>
        </div>

        <div className='bg-gray-400 col-span-1 row-span-1 col-start-9 row-start-2 flex items-center justify-center'>
          <img src={trash} style={{ width: "30px"}} alt=''></img>
        </div>
        
        <div className='bg-gray-200 col-span-1 row-span-1 col-start-11 row-start-1 flex items-center justify-center'>
          <img src={greenSquare} alt='' style={{ width: "50%"}}></img> 
        </div>
        <div className='bg-gray-400 col-span-1 row-span-1 col-start-12 row-start-1'>

        </div>
        <div className='bg-gray-200 col-span-1 row-span-1 col-start-12 row-start-1 rounded-tr-full flex items-center'>
          <img src={greenTable} alt='' style={{ width: "50%"}}></img>
        </div>

        <div className='bg-gray-400 col-span-3 row-span-3 col-start-13 row-start-1'>

        </div>

        <div className='bg-gray-400 col-span-1 flex items-center justify-center row-span-3 col-start-1 row-start-4'>

        </div>
        
        <div className='grid grid-rows-3 grid-cols-12 col-start-3 col-end-10 row-start-4 row-end-8 gap-12' >
          <div className='grid grid-cols-4 col-start-1 col-end-13 gap-12'>
            <div className='bg-gray-200 col-span-1 flex items-center justify-center' style={{borderRadius:"100%"}}>
              <img src={greenTable} alt='' style={{ width: "40%"}}></img>
            </div>
            <div className='bg-gray-200 col-span-1 flex items-center justify-center' style={{borderRadius:"100%"}}>
              <img src={greenTable} alt='' style={{ width: "40%"}}></img>
            </div>
            <div className='bg-gray-200 col-span-1 flex items-center justify-center' style={{borderRadius:"100%"}}>
              <img src={greenTable} alt='' style={{ width: "40%"}}></img>
            </div>
            <div className='bg-gray-200 col-span-1 flex items-center justify-center' style={{borderRadius:"100%"}}>
              <img src={greenTable} alt='' style={{ width: "40%"}}></img></div>     
          </div>

          <div className='grid grid-cols-6 col-start-1 col-end-13 gap-4'>
            <div className='bg-gray-200 col-span-1 flex items-center justify-center' style={{borderRadius:"100%"}}>
              <img src={greenTable} alt='' style={{ width: "50%"}}></img>
            </div>
            <div className='bg-gray-200 col-span-1 flex items-center justify-center' style={{borderRadius:"100%"}}>
              <img src={greenTable} alt='' style={{ width: "50%"}}></img>
            </div>
            <div className='bg-gray-200 col-span-1 flex items-center justify-center' style={{borderRadius:"100%"}}>
              <img src={greenTable} alt='' style={{ width: "50%"}}></img>
            </div>
            <div className='bg-gray-200 col-span-1 flex items-center justify-center' style={{borderRadius:"100%"}}>
              <img src={greenTable} alt='' style={{ width: "50%"}}></img>
            </div>
            <div className='bg-gray-200 col-span-1 flex items-center justify-center' style={{borderRadius:"100%"}}>
              <img src={redTable} alt='' style={{ width: "50%"}}></img>
            </div>
            <div className='bg-gray-200 col-span-1 flex items-center justify-center' style={{borderRadius:"100%"}}>
              <img src={greenTable} alt='' style={{ width: "50%"}}></img>
            </div>
          </div>

          <div className='grid grid-cols-5 col-start-1 col-end-13 gap-8'>
            <div className='bg-gray-200 col-span-1 flex items-center justify-center' style={{borderRadius:"100%"}}>
              <img src={greenTable} alt='' style={{ width: "50%"}}></img>
            </div>
            <div className='bg-gray-200 col-span-1 flex items-center justify-center' style={{borderRadius:"100%"}}>
              <img src={greenTable} alt='' style={{ width: "50%"}}></img>
            </div>
            <div className='bg-gray-200 col-span-2 flex items-center justify-center'>
              <img src={greenSquare} alt='' style={{ width: "20%"}}></img> 
            </div>
            <div className='bg-gray-200 col-span-1 flex items-center justify-center'>
              <img src={greenSquare} alt='' style={{ width: "45%"}}></img> 
            </div>
          </div>
        </div>

        

        <div className='grid grid-rows-4 grid-cols-1 col-start-11 row-start-4 row-end-8 gap-7' >
          <div className='grid grid-rows-3 grid-cols-1 col-start-1 row-start-2 row-end-5 gap-3'>
            <div className='bg-gray-200 col-span-1 flex items-center justify-center' >
              <img src={greenSquare} alt='' style={{ width: "50%"}}></img>  
            </div> 
            <div className='bg-gray-200 col-span-1 flex items-center justify-center' >
              <img src={greenSquare} alt='' style={{ width: "50%"}}></img>  
            </div> 
            <div className='bg-gray-200 col-span-1 flex items-center justify-center' >
              <img src={greenSquare} alt='' style={{ width: "50%"}}></img>  
            </div> 
          </div>
          <div className='bg-gray-200 col-span-1 flex items-center justify-center' >
            <img src={greenSquare} alt='' style={{ width: "50%"}}></img>  
          </div> 
        </div>

        <div className='grid grid-rows-3 grid-cols-1 col-start-13 row-start-5 row-end-9 gap-4'>
          <div className='bg-gray-200 col-span-1 flex items-center justify-center' >
            <img src={greenSquare} alt='' style={{ width: "50%"}}></img>  
          </div> 
          <div className='bg-gray-200 col-span-1 flex items-center justify-center' >
            <img src={greenSquare} alt='' style={{ width: "50%"}}></img>  
          </div> 
          <div className='bg-gray-200 col-span-1 flex items-center justify-center' >
            <img src={greenSquare} alt='' style={{ width: "50%"}}></img>  
          </div> 
        </div>
        
        <div className='grid grid-rows-3 grid-cols-1 col-start-15 row-start-4 row-end-9 gap-4'>
          <div className='bg-gray-200 col-span-1 flex items-center justify-center' >
            <img src={greenSquare} alt='' style={{ width: "50%"}}></img>  
          </div> 
          <div className='bg-gray-200 col-span-1 flex items-center justify-center' >
            <img src={greenSquare} alt='' style={{ width: "50%"}}></img>  
          </div> 
          <div className='bg-gray-200 col-span-1 flex items-center justify-center' >
            <img src={greenSquare} alt='' style={{ width: "50%"}}></img>  
          </div> 
        </div>
        
        <div className='grid grid-cols-11 col-start-1 col-end-12 row-end-11 gap-4'>
          <div className='bg-gray-400 col-span-2 rounded-tr-full rounded-tl-full' >
          </div>
          <div className='bg-gray-200 col-span-1 flex items-center justify-center'>
            <img src={greenSquare} alt='' style={{ width: "50%"}}></img>
          </div>
          <div className='bg-gray-200 col-span-1 flex items-center justify-center'>
            <img src={greenSquare} alt='' style={{ width: "50%"}}></img>
          </div>
          <div className='bg-gray-200 col-span-1 flex items-center justify-center'>
            <img src={greenSquare} alt='' style={{ width: "50%"}}></img>
          </div>
          <div className='bg-gray-200 col-span-1 flex items-center justify-center'>
            <img src={greenSquare} alt='' style={{ width: "50%"}}></img>
          </div>
          <div className='bg-gray-200 col-span-1 flex items-center justify-center'>
            <img src={greenSquare} alt='' style={{ width: "50%"}}></img>
          </div>
          <div className='bg-gray-200 col-span-1 flex items-center justify-center'>
            <img src={greenSquare} alt='' style={{ width: "50%"}}></img>
          </div>
          <div className='bg-gray-200 col-span-1 flex items-center justify-center'>
            <img src={greenSquare} alt='' style={{ width: "50%"}}></img>
          </div>
          <div className='bg-gray-200 col-span-1 flex items-center justify-center'>
            <img src={greenSquare} alt='' style={{ width: "50%"}}></img>
          </div>
          <div className='bg-gray-200 col-span-1 flex items-center justify-center'>
            <img src={greenSquare} alt='' style={{ width: "50%"}}></img>
          </div>
        </div>
        <div className='bg-gray-300 col-start-12 col-span-2  row-end-11 row-span-2 rounded-br-full border-gray-200 border-2 border-l-0 border-t-0 flex items-center justify-center'  >
          <img src={greenTable} alt='' style={{ width: "40%"}}></img>
        </div>
      </div>
    </div>
  )
};

export default TablesLayOut;
