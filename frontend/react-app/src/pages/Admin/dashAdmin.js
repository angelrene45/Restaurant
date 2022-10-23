import React, { useEffect } from 'react';
import { BrowserRouter as  Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import Types from '../../store/Types';
import SideBar from '../../Components/SideBar/SideBar';
import { linksJsonAdmin} from '../../Components/SideBar/Constants'
import  greenTable from '../../assets/round-table.png'
import  greenSquare from '../../assets/dinning-table.png'
import  redTable from '../../assets/round-table-red.png'
import  bar from '../../assets/cocktail.png'
import  soda from '../../assets/soda-can.png'
import  cocina from '../../assets/sarten.png'
import  trash from '../../assets/eliminar.png'
import TablesLayOut from '../../Components/Common/TablesLayOut';


const DashAdmin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: Types.setDashBoard, payload: { dashboard: "ADMIN", links:linksJsonAdmin } });
  });
  
   
  return (
    <>
      <TablesLayOut></TablesLayOut>
    </>
  )
};

export default DashAdmin;