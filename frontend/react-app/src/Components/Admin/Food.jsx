import React from 'react'
import { useState } from 'react';

export default function Food() {
  const [id, setId] = useState("");
  const [name, setName] = useState(""); 
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [disc, setDisc] = useState("");
  const [rating, setRating] = useState("");
  const [clas, setClas] = useState("");
  const [image, setImage] = useState("");

  const switchAuthModeHandler = async (event) => {
    event.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, desc, price, disc, rating, clas, image })
    };
  }
    const handleId = (event) => {
      setId(event.target.value)
      console.log(id)
    };
    const handleName = (event) => {
      setName(event.target.value)
      console.log(name)
    };
    const handleDesc = (event) => {
      setDesc(event.target.value)
      console.log(desc)
    };
    const handlePrice = (event) => {
      setPrice(event.target.value)
      console.log(price)
    };
    const handleDisc = (event) => {
      setDisc(event.target.value)
      console.log(disc)
    };
    const handleRating = (event) => {
      setRating(event.target.value)
      console.log(rating)
    };
    const handleClas = (event) => {
      setClas(event.target.value)
      console.log(clas)
    };
    const handleImage = (event) => {
      setImage(event.target.value)
      console.log(image)
    };


  return (
    <div>
      <form>
        <input type='number' required value={id} onClick={handleId} >id</input>
        <input type='text' required value={name} onClick={handleName} >Name</input>
        <input type='text' required value={desc} onClick={handleDesc} >Description</input>
        <input type='number' required value={price} onClick={handlePrice} >Price</input>
        <input type='text' required value={disc} onClick={handleDisc} >discount</input>
        <input type='number' required value={rating} onClick={handleRating}>rating</input>
        <input type='text' required value={clas} onClick={handleClas} >clasification</input>
        <input type='text' value={image} onClick={handleImage} >Image</input>
        <input type='buton' onClick={switchAuthModeHandler} />
      </form>
    </div>
  )
}