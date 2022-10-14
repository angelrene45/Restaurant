import React from 'react';
import { useState } from 'react';

const User = () => {
  const switchAuthModeHandler = async (event) => {
    event.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, fName, lName, email, mobile, isActive, role, lLog})
    };
  }
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [isActive, setIsActive] = useState("");
  const [role, setRole] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [id, setId] = useState("");
  const [lLog, setLLog] = useState("");

  
  const handleId = (event) => {
    setId(event.target.value)
    console.log(id)
  };
  const handleFName = (event) => {
    setFName(event.target.value)
    console.log(fName)
  };
  const handleLName = (event) => {
    setLName(event.target.value)
    console.log(lName)
  };
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
  const handleRole = (event) => {
    setRole(event.target.value)
    console.log(role)
  };
  const handleLLog = (event) => {
    setLLog(event.target.value)
    console.log(lLog)
  };

  return (
    <div>
        <form>
            <input type="email" onClick={handleEmail} />
            <input type="text" onClick={handleFName} />
            <input type="text" onClick={handleLName} />
            <input type="text" onClick={handleMobile} />
            <input type="text" onClick={handleIsActive} />
            <input type="text" onClick={handleRole} />
            <label>Id</label>
            <input type="number" onClick={handleId} />
            <input type="date" onclick={handleLLog} />
            <input type="button" onClick={switchAuthModeHandler} />
        </form>
    </div>
  )
}

export default User