import React from 'react'
import { useState } from 'react';

const Payment = () => {

  const [orderId, setOrderId] = useState("");
  const [userId, setUserId] = useState("");
  const [custId, setCustId] = useState("");
  const [code, setCode] = useState("");
  const [mode, setMode] = useState("");
  const [status, setStatus] = useState("");
  
  const switchAuthModeHandler = async (event) => {
    event.preventDefault();
    
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId, userId, custId, code, mode, status})
    };
  }

  const handleOrderId = (event) => {
    setOrderId(event.target.value)
    console.log(orderId)
  };
  const handleUserId = (event) => {
    setUserId(event.target.value)
    console.log(userId)
  };
  const handleCustId = (event) => {
    setCustId(event.target.value)
    console.log(custId)
  };
  const handleCode = (event) => {
    setCode(event.target.value)
    console.log(code)
  };
  const handleMode = (event) => {
    setMode(event.target.value)
    console.log(mode)
  };
  const handleStatus = (event) => {
    setStatus(event.target.value)
    console.log(status)
  };

  return (
    <div>
        <form>
            <input type='number' required onChange={handleOrderId}>order_id</input>
            <input type='number' required onChange={handleUserId}>user_id</input>
            <input type='number' required onChange={handleCustId}>customer_id</input>
            <input type='password' required onChange={handleCode}>code</input>
            <input type='text' required onChange={handleMode}>mode</input>
            <input type='text' required onChange={handleStatus}>status</input>
            <input type="button" onClick={switchAuthModeHandler} />
        </form>
    </div>
  )
}

export default Payment