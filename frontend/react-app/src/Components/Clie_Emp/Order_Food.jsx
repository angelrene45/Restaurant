import React from 'react'
import { useState } from 'react';

const Order_Food = () => {
  const switchAuthModeHandler = async (event) => {
    event.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, foodId, price, quantity, discount })
    };
  }
  const [orderId, setOrderId] = useState("");
  const [foodId, setFoodId] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discount, setDiscount] = useState("");

  const handleOrderId = (event) => {
    setOrderId(event.target.value)
    console.log(orderId)
  };
  const handleFoodId = (event) => {
    setFoodId(event.target.value)
    console.log(foodId)
  };
  const handlePrice = (event) => {
    setPrice(event.target.value)
    console.log(price)
  };
  const handleQuantity = (event) => {
    setQuantity(event.target.value)
    console.log(quantity)
  };
  const handleDiscount = (event) => {
    setDiscount(event.target.value)
    console.log(discount)
  };

  return (
    <div>
        <form>
            <input type='number' required onChange={handleOrderId}>order_id</input>
            <input type='number' required onChange={handleFoodId}>food_id</input>
            <input type='number' required onChange={handlePrice}>price</input>
            <input type='number' required onChange={handleQuantity}>quantity</input>
            <input type='number' required onChange={handleDiscount}>discount</input>
            <input type='button' required onChange={switchAuthModeHandler} />
        </form>
    </div>
  )
}

export default Order_Food