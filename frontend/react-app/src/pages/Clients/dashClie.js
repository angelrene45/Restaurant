<<<<<<< HEAD
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from '../../Components/NavBar/NavBar';
import SideBar from '../../Components/SideBar/SideBar';

const DashClie = () => {
=======
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

>>>>>>> refs/remotes/origin/FrontBeto
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
<<<<<<< HEAD
      <div className='fixed md:static bg-sky-900 navbar w-full text-green-400 p-5 m-0'>
        <Navbar theme="Client" />
      </div>
=======
>>>>>>> refs/remotes/origin/FrontBeto
      <div className='w-40 fixed sidebar  bg-gray-900 shadow-lg shadow-gray-500/90 h-full text-green-300 p-5'>
        <SideBar links={linksJson} />
      </div>
      <div>
        <Routes>
<<<<<<< HEAD
          <Route path='/' element={<dashClie />} />
          <Route path='/home' element={<dashClie />} />
=======
>>>>>>> refs/remotes/origin/FrontBeto
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