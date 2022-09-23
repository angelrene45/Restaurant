import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavbarClie, SidebarClie } from '../../components'

export default function DashClie() {
  return (
    <Router className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
    <div className='fixed md:static bg-sky-900 navbar w-full text-green-400 p-5 m-0'>
    <NavbarClie />
  </div>
  <div className='w-40 fixed sidebar  bg-gray-900 shadow-lg shadow-gray-500/90 h-full text-green-300 p-5'>
    <SidebarClie />
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
  </Router>
  )
}
