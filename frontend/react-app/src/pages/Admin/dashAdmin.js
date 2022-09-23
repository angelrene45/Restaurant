import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavbarAdm, SidebarAdm } from '../../components'

export default function DashAdmin(){
  return (
    
    <Router className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
        <div className='fixed md:static bg-sky-900 navbar w-full text-green-400 p-5 m-0'>
        <NavbarAdm />
      </div>
      <div className='w-40 fixed sidebar  bg-gray-900 shadow-lg shadow-gray-500/90 h-full text-green-300 p-5'>
        <SidebarAdm />
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
  </Router>
  )
}