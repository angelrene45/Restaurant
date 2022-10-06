import { Fragment } from 'react';
<<<<<<< HEAD

import MainNavigation from './MainNavigation';

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation password/>
=======
import { useSelector } from 'react-redux';

import MainNavigation from './MainNavigation';


const Layout = (props) => {
  const authorization = useSelector(state => state.LoginReducer.authorization)
  return (
    <Fragment>
       { authorization && <MainNavigation password/> }
>>>>>>> refs/remotes/origin/FrontBeto
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
