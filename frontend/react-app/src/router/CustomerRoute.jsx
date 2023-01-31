import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { LoginUserPage } from '../auth/pages'
import { getClaimsToken, TypeUsers } from '../utils'


export const CustomerRoute = ({ children }) => {

    const { pathname, search } = useLocation();
    const {user_type, user_rol} = getClaimsToken(); // get claims

    // store last path from customer
    const lastPath = pathname + search;
    localStorage.setItem('lastPath', lastPath)

    
    return (!TypeUsers.Employee.includes(user_rol) && !TypeUsers.Admin.includes(user_rol))
        ? children
        : <LoginUserPage/>
}