import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import Types from '../../store/Types';
import SideBar from '../../Components/SideBar/SideBar';
import NavBar from '../../Components/NavBar/NavBar';
import { Food, Employees, Providers, Reports, Sales } from '../../Components'


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
    <div>
          <div className='w-40 fixed sidebar  bg-gray-900 shadow-lg shadow-gray-500/90 h-full text-green-300 p-5'>
            <SideBar links={linksJson} />
          </div>
          <div className='flex relative bg-gray-500'>
            <Routes>
                
                    <Route path='/client' element={<DashAdmin />} />
                    <Route path='/employees' element={<Employees />} />
                    <Route path='/providers' element={<Providers />} />
                    <Route path='/reports' element={<Reports />} />
                    <Route path='/menu_reg' element={<Food />} /> 
              
            </Routes>
          </div>
    </div>
  )
};

export default DashAdmin;
