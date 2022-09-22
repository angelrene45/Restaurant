import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export const dashClie = () => {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<dashClie />} />
    </Routes>
  </Router>
  )
}
