import React from 'react'
import { useState } from 'react';

export default function Food() {
  const [name, setName] = useState(""); 
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [disc, setDisc] = useState("");
  const [image, setImage] = useState("");
  const [isActive, setIsActive] = useState("");
  const [id, setId] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [historyPrice, setHistoryPrice] = useState("");

  const switchAuthModeHandler = async (event) => {
    event.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, desc, price, disc, categories, isActive, image, createDate, updateDate, historyPrice })
    };
  }
    const handleName = (event) => {
      setName(event.target.value)
      console.log(name)
    };
    const handleDesc = (event) => {
      setDesc(event.target.value)
      console.log(desc)
    };
    const handlePrice = (event) => {
      setPrice(event.target.value)
      console.log(price)
    }; 
    const handleCategories = (event) => {
      setCategories(event.target.value)
      console.log(categories)
    };
    const handleDisc = (event) => {
      setDisc(event.target.value)
      console.log(disc)
    };
    const handleImage = (event) => {
      setImage(event.target.value)
      console.log(image)
    };
    const handleIsActive = (event) => {
      setIsActive(event.target.value)
      console.log(isActive)
    };   
    const handleId = (event) => {
      setId(event.target.value)
      console.log(id)
    };
    const handleCreateDate = (event) => {
      setCreateDate(event.target.value)
      console.log(createDate)
    };
    const handleUpdateDate = (event) => {
      setUpdateDate(event.target.value)
      console.log(updateDate)
    };
    const handleHistoryPrice = (event) => {
      setHistoryPrice(event.target.value)
      console.log(historyPrice)
    };


  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-gray-500'>
      <form>
        <label> Name</label>
        <input type='text' onChange={handleName} /><br /><br />
        <label>Descripcion</label>
        <input type='text' onChange={handleDesc} /><br /><br />
        <input type='number' onChange={handlePrice} />Price<br /><br />
        <input type='number' onChange={handleCategories} />rating<br /><br />
        <input type='text' onChange={handleDisc} />discount<br /><br />
        <input type='text' onChange={handleImage} />Image<br /><br />
        <input type='number' onChange={handleIsActive} />is active <br /><br />
        <input type='number' required onChange={handleId} />id<br /><br />
        <input type='text' required onChange={handleCreateDate} />create date<br /><br />
        <input type='text' required onChange={handleUpdateDate} />update date<br /><br />
        <input type='text' required onChange={handleHistoryPrice} />history price<br /><br />
        <input type='button' onClick={switchAuthModeHandler} />
      </form>
    </div>
  )
}