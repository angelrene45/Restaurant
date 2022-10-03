import React from 'react'
import { useState } from 'react';


const Address = () => {
  const [id, setId] = useState("");
  const [custId, setCustId] = useState(""); 
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stte, setStte] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [location, setLocation] = useState("");

  const switchAuthModeHandler = async (event) => {
    event.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, custId, street, city, stte, country, postalCode, location })
    };
  }
    const handleId = (event) => {
      setId(event.target.value)
      console.log(id)
    };
    const handleCustId = (event) => {
      setCustId(event.target.value)
      console.log(custId)
    };
    const handleStreet = (event) => {
      setStreet(event.target.value)
      console.log(street)
    };
    const handleCity = (event) => {
      setCity(event.target.value)
      console.log(city)
    };
    const handleStte = (event) => {
      setStte(event.target.value)
      console.log(stte)
    };
    const handleCountry = (event) => {
      setCountry(event.target.value)
      console.log(country)
    };
    const handlePostalCode = (event) => {
      setPostalCode(event.target.value)
      console.log(postalCode)
    };
    const handleLocation = (event) => {
      setLocation(event.target.value)
      console.log(location)
    };


  return (
    <div>
        <form>
            <input type='number' required onChange={handleId}>id</input>
            <input type='number' required onChange={handleCustId}>customer_id</input>
            <input type='text' required onChange={handleStreet}>street</input>
            <input type='text' required onChange={handleCity}>city</input>
            <input type='text' required onChange={handleStte}>state</input>
            <input  type='text' required onChange={handleCountry}>country</input>
            <input type='number' required onChange={handlePostalCode}>postal_code</input>
            <input type='text' required onChange={handleLocation}>location</input>
        </form>
    </div>
  )
}

export default Address