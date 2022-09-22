import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavbarAdm, SidebarAdm } from '../../components'
export const dashAdmin = () => {
  return (
    <Router>
        <div className='fixed md:static bg-sky-900 navbar w-full text-green-400 p-5 m-0'>
        <NavbarAdm />
      </div>
      <div className='w-40 fixed sidebar  bg-gray-900 shadow-lg shadow-gray-500/90 h-full text-green-300 p-5'>
        <SidebarAdm />
        </div>
    <Routes>
      <Route path='/' element={<dashAdmin />} />
      <Route path='/home' element={<dashAdmin />} />
    </Routes>
  </Router>
  )
}
