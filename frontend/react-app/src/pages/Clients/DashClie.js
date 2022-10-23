import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import SideBar from '../../Components/SideBar/SideBar';
import Types from '../../store/Types';

const DashClie = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: Types.setDashBoard, payload: "CLIENT" });
  });

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
