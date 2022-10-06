import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import SideBar from '../../Components/SideBar/SideBar';
import Types from '../../store/Types';

const DashEmp = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: Types.setDashBoard, payload: "EMPLOYEES" });
  });

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
      <div className='w-40 fixed sidebar  bg-gray-900 shadow-lg shadow-gray-500/90 h-full text-green-300 p-5'>
        <SideBar links={linksJson} />
      </div>
    </>
  )
}

export default DashEmp;