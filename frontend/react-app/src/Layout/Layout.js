import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import MainNavigation from './MainNavigation';

const Layout = (props) => {
  const authorization = useSelector(state => state.LoginReducer.authorization)
  return (
    <Fragment>
       { authorization && <MainNavigation password/> }
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
