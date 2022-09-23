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
      name: "Menu",
      url: "/menu"
    },
    {
      name: "Payment",
      url: "/payment"
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
        <Router>
          <Routes>
            <Route path='/' element={<dashClie />} />
            <Route path='/home' element={<dashClie />} />
            <Route path='/tables' element={<dashClie />} />
            <Route path='/menu' element={<dashClie />} />
            <Route path='/payment' element={<dashClie />} />
          </Routes>
        </Router>
      </div>
    </>
  )
};

export default DashClie;