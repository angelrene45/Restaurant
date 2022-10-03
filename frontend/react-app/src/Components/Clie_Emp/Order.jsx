import React from 'react'
import { useState } from 'react';

const Order = () => {
  
  const [id, setId] = useState("");
  const [userId, setUserId] = useState("");
  const [custId, setCustId] = useState("");
  const [boardId, setBoardId] = useState("");
  const [status, setStatus] = useState("");
  const [subTotal, setSubTotal] = useState("");
  const [tax, setTax] = useState("");
  const [total, setTotal] = useState("");
  const [disc, setDisc] = useState("");
  const [grantTotal, setGrantTotal] = useState("");
  const switchAuthModeHandler = async (event) => {
    event.preventDefault();
    
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, userId, custId, boardId, status,subTotal, tax, total, disc, grantTotal })
    };
  }

  const handleId = (event) => {
    setId(event.target.value)
    console.log(id)
  };
  const handleUserId = (event) => {
    setUserId(event.target.value)
    console.log(userId)
  };
  const handleCustId = (event) => {
    setCustId(event.target.value)
    console.log(custId)
  };
  const handleBoardId = (event) => {
    setBoardId(event.target.value)
    console.log(boardId)
  };
  const handleStatus = (event) => {
    setStatus(event.target.value)
    console.log(status)
  };
  const handleSubTotal = (event) => {
    setSubTotal(event.target.value)
    console.log(subTotal)
  };
  const handleTax = (event) => {
    setTax(event.target.value)
    console.log(tax)
  };
  const handleTotal = (event) => {
    setTotal(event.target.value)
    console.log(total)
  };
  const handleDisc = (event) => {
    setDisc(event.target.value)
    console.log(disc)
  };
  const handleGrantTotal = (event) => {
    setGrantTotal(event.target.value)
    console.log(grantTotal)
  };
  return (
    <div>
        <form>
            <input type='number' required onChange={handleId}>id</input>
            <input type='number' required onChange={handleUserId}>user_id</input>
            <input type='number' required onChange={handleCustId}>customer_id</input>
            <input type='number' required onChange={handleBoardId}>board_id</input>
            <input type='number' required onChange={handleStatus}>status</input>
            <input type='number' required onChange={handleSubTotal}>subtotal</input>
            <input type='number' required onChange={handleTax}>tax</input>
            <input type='number' required onChange={handleTotal}>total</input>
            <input type='number' required onChange={handleDisc}>discount</input>
            <input type='number' required onChange={handleGrantTotal}>grant_total</input>
            <input type='button' onClick={switchAuthModeHandler} />
        </form>
    </div>
  )
}

export default Order