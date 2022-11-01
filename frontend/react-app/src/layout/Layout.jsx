import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import MainNavigation from './MainNavigation';
import SideBar from '../components/sideBar/SideBar';


const Layout = (props) => {
  const links = useSelector(state => state.dashInfo.links)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <Fragment>
      <div className="flex h-screen overflow-hidden">
        <SideBar links={links} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <MainNavigation password sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> 
        <main>{props.children}</main> 
       </div>
      </div>
    </Fragment>
  );
};

export default Layout;
