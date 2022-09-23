import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from '../../Components/NavBar/NavBar';
import SideBar from '../../Components/SideBar/SideBar';

const DashClie = () => {
  const linksJson = [
    {
      name: "Table Map",
      url: "/"
    },
    {
      name: "Red Meats",
      url: "/r_meats"
    },
    {
      name: "White Meats",
      url: "/w_meats"
    },
    {
      name: "Sea food",
      url: "/seafood"
    },
    {
      name: "Drinks without Alcohol ",
      url: "/drinks_wo"
    },
    {
      name: "Alcoholic Drinks ",
      url: "/drinks_w"
    }
  ];

  return (
    <>
      <div className='fixed md:static bg-sky-900 navbar w-full text-green-400 p-5 m-0'>
        <Navbar theme="Client" />
      </div>
      <div className='w-40 fixed sidebar  bg-gray-900 shadow-lg shadow-gray-500/90 h-full text-green-300 p-5'>
        <SideBar links={linksJson} />
      </div>
      <div>
        <Routes>
          <Route path='/' element={<dashClie />} />
          <Route path='/home' element={<dashClie />} />
          <Route path='/tables' element={<dashClie />} />
          <Route path='/r_meat' element={<dashClie />} />
          <Route path='/w_meats' element={<dashClie />} />
          <Route path='/seafood' element={<dashClie />} />
          <Route path='/drinks_wo' element={<dashClie />} />
          <Route path='/drinks_w' element={<dashClie />} />
        </Routes>
      </div>
    </>
  )
};

export default DashClie;