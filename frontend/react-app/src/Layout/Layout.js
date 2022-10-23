import { Fragment } from 'react';
<<<<<<< HEAD
import { useSelector } from 'react-redux';

import MainNavigation from './MainNavigation';
=======
<<<<<<< HEAD

import MainNavigation from './MainNavigation';

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation password/>
=======
import { useSelector } from 'react-redux';

import MainNavigation from './MainNavigation';
import SideBar from '../Components/SideBar/SideBar';
>>>>>>> FrontBeto


const Layout = (props) => {
  const authorization = useSelector(state => state.LoginReducer.authorization)
<<<<<<< HEAD
  return (
    <Fragment>
       { authorization && <MainNavigation password/> }
      <main>{props.children}</main>
=======
  const links = useSelector(state => state.DashBoardReducer.links)
  return (
    <Fragment>
       { authorization && <MainNavigation password/> }
<<<<<<< HEAD
>>>>>>> refs/remotes/origin/FrontBeto
      <main>{props.children}</main>
=======
       { authorization && <SideBar links={links} /> } 
       { authorization && <main className='fixed' style={{ marginLeft: '10rem', height: '100%', width: 'calc(100% - 10rem)', background: '#E3F8E4'}}>{props.children}</main> }
       { !authorization && <main className='fixed' style={{ height: '100%', width: 'calc(100% - 10rem)'}}>{props.children}</main> }
>>>>>>> 3244ace7a7c7ec25543222531eacf37ae4beea4d
>>>>>>> FrontBeto
    </Fragment>
  );
};

export default Layout;
