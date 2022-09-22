import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


export const dashEmp = () => {
  return (
    <Router>
        <div className='fixed md:static bg-sky-900 navbar w-full text-green-400 p-5 m-0'>
        <NavbarEmp />
      </div>
      <div className='w-40 fixed sidebar  bg-gray-900 shadow-lg shadow-gray-500/90 h-full text-green-300 p-5'>
        <SidebarEmp />
        </div>
    <Routes>
      <Route path='/' element={<dashEmp />} />
      <Route path='/home' element={<dashEmp />} />
    </Routes>
  </Router>
  )
}
