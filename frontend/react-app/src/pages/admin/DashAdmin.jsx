import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import Types from '../../store/Types';
import SideBar from '../../components/sideBar/SideBar';
import { linksJsonAdmin} from '../../components/sideBar/Constants'

import TablesLayOut from '../../components/common/TablesLayOut';
import MenuRegister from '../../components/admin/MenuRegister';


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