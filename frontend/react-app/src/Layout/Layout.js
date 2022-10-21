import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import MainNavigation from './MainNavigation';
import SideBar from '../Components/SideBar/SideBar';


const Layout = (props) => {
  const authorization = useSelector(state => state.LoginReducer.authorization)
  const links = useSelector(state => state.DashBoardReducer.links)
  return (
    <Fragment>
       { authorization && <MainNavigation password/> }
       { authorization && <SideBar links={links} /> } 
       <main className='fixed' style={{ marginLeft: '10rem', height: '100%', width: 'calc(100% - 10rem)'}}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
