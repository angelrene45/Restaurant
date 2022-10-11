import React from 'react'
import { useState } from 'react';

export default function Restaurant() {
  const switchAuthModeHandler = async (event) => {
    event.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, image, desc, address, location })
    };
  }
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");

  const handleId = (event) => {
    setId(event.target.value)
    console.log(id)
  };
  const handleName = (event) => {
    setName(event.target.value)
    console.log(name)
  };
  const handleImage = (event) => {
    setImage(event.target.value)
    console.log(image)
  };
  const handleDesc = (event) => {
    setDesc(event.target.value)
    console.log(desc)
  };
  const handleAddress = (event) => {
    setAddress(event.target.value)
    console.log(address)
  };
  const handleLocation = (event) => {
    setLocation(event.target.value)
    console.log(location)
  };
  

  return (
    <div>
    <form>
        <input type='number' require onChange={handleId}>Id</input>
        <input type='text' require onChange={handleName}>Name</input>
        <input type='text' require onChange={handleImage}>Image</input>
        <input type='text' require onChange={handleDesc}>Descripcion</input>
        <input type='text' require onChange={handleAddress}>Address</input>
        <input type='text' require onChange={handleLocation}>Location</input>
        <input type='button' onClick={switchAuthModeHandler} />
    </form>
    </div>
  )
}
