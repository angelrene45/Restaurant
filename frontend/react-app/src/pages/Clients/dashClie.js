import React, { useEffect } from 'react';
import { BrowserRouter as  Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import SideBar from '../../Components/SideBar/SideBar';
import Types from '../../store/Types';
import { linksJsonClie } from '../../Components/SideBar/Constants'
const DashClie = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: Types.setDashBoard, payload: { dashboard: "CLIENT", links:linksJsonClie } });
  });


  return (
    <>
      <div>
        
      </div>
    </>
  )
};

export default DashClie;