import React from 'react'
import { useState } from 'react';

export default function CategoryCreate() {
    const [name, setName] = useState("");
   
    const switchAuthModeHandler = async (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        };
      }
    const handleName = (event) => {
        setName(event.target.value)
        console.log(name)
      };
      return (
  <div>
  <form> 
    <input type='text' onChange={handleName} /><br /><br />
    <input type='button' onClick={switchAuthModeHandler} />
  </form>
  </div>
  )
}
