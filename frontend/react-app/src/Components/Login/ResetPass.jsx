import React from 'react'
import { useState } from 'react';

export default function ResetPass(){
    const switchAuthModeHandler = async (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, userType})
        };
      }
      const [email, setEmail] = useState("");
      const [userType, setUserType] = useState("");
      

    const handleEmail = (event) => {
        setEmail(event.target.value)
        console.log(email)
      };
      const handleUserType = (event) => {
        setUserType(event.target.value)
        console.log(userType)
      };
  return (
    <div>
        <form>
            <input type="email" onClick={handleEmail} />
            <input type="text" onClick={handleUserType} />
            <input type="button" onClick={switchAuthModeHandler} />
        </form>
    </div>
  )
}
