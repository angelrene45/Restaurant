import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import SideBar from '../../Components/SideBar/SideBar';
import Navbar from '../../Components/NavBar/NavBar';

const DashEmp = () => {
  const linksJson = [
    {
      name: "Inicio",
      url: "/"
    },
    {
      name: "Ventas",
      url: "/ventas"
    },
    {
      name: "Empleados",
      url: "/empleados"
    },
    {
      name: "Proveedores",
      url: "/proveedores"
    },
  ];

  return (
    <>
      <div className='fixed md:static bg-sky-900 navbar w-full text-green-400 p-5 m-0'>
        <Navbar theme="Employees"/>
      </div>
      <div className='w-40 fixed sidebar  bg-gray-900 shadow-lg shadow-gray-500/90 h-full text-green-300 p-5'>
        <SideBar links={linksJson} />
      </div>
      <Routes>
        <Route path='/' element={<dashEmp />} />
        <Route path='/home' element={<dashEmp />} />
      </Routes>
    </>
  )
}

export default DashEmp;