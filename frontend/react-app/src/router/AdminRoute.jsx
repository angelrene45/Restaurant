import { useSelector }from 'react-redux';

import { LoginPage } from '../auth/pages'
import { TypeUsers } from '../utils';


export const AdminRoute = ({ children }) => {

    const {authorization, role} = useSelector(state => state.login)
    
    return (authorization && role === TypeUsers.Admin)
        ? children
        : <LoginPage/>
}