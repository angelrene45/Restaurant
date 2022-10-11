import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import Types from '../../store/Types';
import SideBar from '../../Components/SideBar/SideBar';
import { MenuReg, Employees, Providers, Reports, Sales } from '../../Components'


const DashAdmin = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: Types.setDashBoard, payload: "ADMIN" });
  });
  
  
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
      <div className='w-40 fixed sidebar  bg-gray-900 shadow-lg shadow-gray-500/90 h-full text-green-300 p-5'>
        <SideBar links={linksJson} />
      
       <Routes>
          <Route path='/sales' element={<DashAdmin />} />
          <Route path='/employees' element={<DashAdmin />} />
          <Route path='/providers' element={<DashAdmin />} />
          <Route path='/reports' element={<DashAdmin />} />
          <Route path='/menu_reg' element={<DashAdmin />} /> 
        </Routes>
      </div>
    </>
  )
};

export default DashAdmin;