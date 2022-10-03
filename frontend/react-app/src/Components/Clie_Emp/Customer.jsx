import React from 'react'
import { useState } from 'react';

const Customer = () => {
  const switchAuthModeHandler = async (event) => {
    event.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, fName, lName, email, mobile, hash, isActive, lLog, createDate, updateDate })
    };
  }
  const [id, setId] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [hash, setHash] = useState("");
  const [isActive, setIsActive] = useState("");
  const [lLog, setLLog] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  
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
  const handleHash = (event) => {
    setHash(event.target.value)
    console.log(hash)
  };
  const handleIsActive = (event) => {
    setIsActive(event.target.value)
    console.log(isActive)
  };
  
  const handleLLog = (event) => {
    setLLog(event.target.value)
    console.log(lLog)
  };
  const handleCreateDate = (event) => {
    setCreateDate(event.target.value)
    console.log(createDate)
  };
  const handleUpdateDate = (event) => {
    setUpdateDate(event.target.value)
    console.log(updateDate)
  };
  return (
    <div>
        <form>
            <input type="number" onClick={handleId}>id</input>
            <input type="text" onClick={handleFName}>first name</input>
            <input type="text" onClick={handleLName}>last name</input>
            <input type="email" onClick={handleEmail}>email</input>
            <input type="text" onClick={handleMobile}>mobile</input>
            <input type="text" onClick={handleHash}>hash</input>
            <input type="text" onClick={handleIsActive}>is_active</input>
            <input type="date" onclick={handleLLog}>last log</input>
            <input type="date" onClick={handleCreateDate}>create date</input>
            <input type="date" onClick={handleUpdateDate}>update date</input>
            <input type="button" onClick={switchAuthModeHandler} />
        </form>
    </div>
  )
}

export default Customer