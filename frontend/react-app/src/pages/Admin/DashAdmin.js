import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import Types from '../../store/Types';
import SideBar from '../../Components/SideBar/SideBar';
import { linksJsonAdmin} from '../../Components/SideBar/Constants'

import TablesLayOut from '../../Components/Common/TablesLayOut';
import MenuRegister from '../../Components/Admin/MenuRegister';


const DashAdmin = () => {
  const dispatch = useDispatch();
  let { params } = useParams();
  useEffect(() => {
    dispatch({ type: Types.setDashBoard, payload: { dashboard: "ADMIN", links:linksJsonAdmin } });
  });

  useEffect(() => {
    
  },[params]);
  
   console.log(params)
  return (
    <>
      
      { params === 'menu_reg' && <MenuRegister/> }
      { params === undefined && <TablesLayOut />}
    </>
  )
};

export default DashAdmin;