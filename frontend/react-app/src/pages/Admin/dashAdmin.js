import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from '../../Components/NavBar/NavBar';
import SideBar from '../../Components/SideBar/SideBar';


const DashAdmin = () => {
  const linksJson = [
    {
      name: "Home",
      url: "/"
    },
    {
      name: "Sale",
      url: "/sales"
    },
    {
      name: "Employees",
      url: "/employees"
    },
    {
      name: "Providers",
      url: "/providers"
    },
    {
      name: "Reports",
      url: "/reports"
    },
    {
      name: "Menu register",
      url: "/menu_reg"
    }
  ];
   
  return (
    <>
      <div className='fixed md:static bg-sky-900 navbar w-full text-green-400 p-5 m-0'>
        <Navbar theme="Administrator" />
      </div>
      <div className='w-40 fixed sidebar  bg-gray-900 shadow-lg shadow-gray-500/90 h-full text-green-300 p-5'>
        <SideBar links={linksJson} />
      </div>
      <div>
        <Routes>
          <Route path='/' element={<dashAdmin />} />
          <Route path='/home' element={<dashAdmin />} />
          <Route path='/sales' element={<dashAdmin />} />
          <Route path='/employees' element={<dashAdmin />} />
          <Route path='/providers' element={<dashAdmin />} />
          <Route path='/reports' element={<dashAdmin />} />
          <Route path='/menu_reg' element={<dashAdmin />} />
        </Routes>
      </div>
    </>
  )
};

export default DashAdmin;