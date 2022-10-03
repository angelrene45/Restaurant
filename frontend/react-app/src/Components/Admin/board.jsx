import React from 'react';
import { useState } from 'react';

const board = () => {
  const [id, setId] = useState("");
  const [idArea, setIdArea] = useState(""); 
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [icon, setIcon] = useState("");
  const [smoke, setSmoke] = useState("");
  const [position, setPosition] = useState("");
  const [qr, setQR] = useState("");

  const switchAuthModeHandler = async (event) => {
    event.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, idArea, name, capacity, icon, smoke, position, qr })
    };
  }
    const handleId = (event) => {
      setId(event.target.value)
      console.log(id)
    };
    const handleIdArea = (event) => {
      setIdArea(event.target.value)
      console.log(idArea)
    };
    const handleName = (event) => {
      setName(event.target.value)
      console.log(name)
    };
    const handleCapacity = (event) => {
      setCapacity(event.target.value)
      console.log(capacity)
    };
    const handleIcon = (event) => {
      setIcon(event.target.value)
      console.log(icon)
    };
    const handleSmoke = (event) => {
      setSmoke(event.target.value)
      console.log(smoke)
    };
    const handlePosition = (event) => {
      setPosition(event.target.value)
      console.log(position)
    };
    const handleQR = (event) => {
      setQR(event.target.value)
      console.log(qr)
    };
  return (
    <div>
        <form>
            <input type='number' required onChange={handleId} >id</input>
            <input type='number' required onChange={handleIdArea}>id_area</input>
            <input type='text' required onChange={handleName}>name</input>
            <input type='number' required onChange={handleCapacity}>capacity</input>
            <input type='text' required onChange={handleIcon}>icon</input>
            <input type='boolean' required onChange={handleSmoke}>can_smoke</input>
            <input type='text' required onChange={handlePosition}>position</input>
            <input type='text' required onChange={handleQR}>QR</input>
            <input type='button' onClick={switchAuthModeHandler} />
        </form>
    </div>
  )
}

export default board