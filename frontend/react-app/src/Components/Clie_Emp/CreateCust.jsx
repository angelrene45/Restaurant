import React from 'react'
import { useState } from 'react';

export default function CreateCust() {
    const [email, setEmail] = useState(""); 
    const [mobile, setMobile] = useState("");
    const [isActive, setIsActive] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [password, setPassword] = useState("");
  
    const switchAuthModeHandler = async (event) => {
      event.preventDefault();
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, mobile, isActive, fName, lName, password })
      };
    }
      const handleEmail = (event) => {
        setEmail(event.target.value)
        console.log(email)
      };
      const handleMobile = (event) => {
        setMobile(event.target.value)
        console.log(mobile)
      };
      const handleIsActive = (event) => {
        setIsActive(event.target.value)
        console.log(isActive)
      };   
      const handleFName = (event) => {
        setFName(event.target.value)
        console.log(fName)
      };
      const handleLName = (event) => {
        setLName(event.target.value)
        console.log(lName)
      };
      const handlePassword = (event) => {
        setPassword(event.target.value)
        console.log(password)
      };
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-gray-500'>
    <form>
      <label> Name</label>
      <input type='email' required onChange={handleEmail} /><br /><br />
      <label>Descripcion</label>
      <input type='text' onChange={handleMobile} /><br /><br />
      <input type='number' onChange={handleIsActive} /><br /><br />
      <input type='number' onChange={handleFName} /><br /><br />
      <input type='text' onChange={handleLName} /><br /><br />
      <input type='password' required onChange={handlePassword} /><br /><br />
      <input type='button' onClick={switchAuthModeHandler} />
    </form>
  </div>
  )
}
