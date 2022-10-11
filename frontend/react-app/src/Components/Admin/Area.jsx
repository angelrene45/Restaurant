import React from 'react'
import { useState } from 'react'

const Area = () => {
  const { id, setId } = useState('');
  const { name, setName } = useState('');
  const { json, setJson } = useState('');
  const switchAuthModeHandler = async (event) => {
    event.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, json })
    };
  }

  const handleId = (event) => {
    setId(event.target.value)
    console.log(id)
  }
  const handleName = (event) => {
    setName(event.target.value)
    console.log(name)
  }
  const handleJson = (event) => {
    setJson(event.target.value)
    console.log(json)
  }


  return (
    <div>
        <form>
            <input type='number' required onChange={handleId}>id</input>
            <input type='text' required onChange={handleName}>name</input>
            <input type='text' onChange={handleJson}>json items</input>
            <input type='button' onClick={switchAuthModeHandler} />
        </form> 
    </div>
  )
}

export default Area