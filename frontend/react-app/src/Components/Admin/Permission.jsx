import React from 'react'
import { useState } from 'react';

export default function Permission()  {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [group, setGroup] = useState("");
    const switchAuthModeHandler = async (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, name, group })
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

    const handleGroup = (event) => {
    setGroup(event.target.value)
    console.log(group)
    };

    return (
    <div>
        <form>
            <input type='number' required value={id} onChange={handleId}>id</input>
            <input type='text' required value={name} onChange={handleName} >name</input>
            <input type='text' required value={group} onChange={handleGroup}>group</input>
            <input type='button' onClick={switchAuthModeHandler} />
        </form>
    </div>
  )
}