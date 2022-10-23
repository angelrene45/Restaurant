import React, { useEffect } from 'react';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import SideBar from '../../Components/SideBar/SideBar';
import { linksJsonEmployees } from '../../Components/SideBar/Constants'
import Types from '../../store/Types';

const DashEmp = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: Types.setDashBoard, payload: { dashboard: "EMPLOYEES", links: linksJsonEmployees } });
  });

  
  return (
    <>

    </>
  )
}

export default DashEmp;