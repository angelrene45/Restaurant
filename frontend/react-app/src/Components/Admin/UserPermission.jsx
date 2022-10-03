import React from 'react'
import { useState } from 'react'

export default function UserPermission() {
  const [userId, setUserId] = useState("");
  const [permissionId, setPermissionId] = useState("");
  
  const switchAuthModeHandler = async (event) => {
    event.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, permissionId })
    };
  }

  const handleUserId = (event) => {
    setUserId(event.target.value)
    console.log(userId)
  };
  const handlePermissionId = (event) =>{
    setPermissionId(event.target.value)
    console.log(permissionId)
  };

  return (
    <div>
        <form>
            <input type="number" required onChange={handleUserId}>user_id</input>
            <input type="number" required onChange={handlePermissionId}>permission_id</input>
            <input type="submit" onClick={switchAuthModeHandler} /> 
        </form>
    </div>
  )
}