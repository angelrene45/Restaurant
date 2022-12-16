import { useSelector } from 'react-redux'

import { LoginUserPage } from '../auth/pages'
import { getClaimsToken, TypeUsers } from "../utils"


export const EmployeeRoute = ({ children }) => {
    
    const {status} = useSelector(state => state.auth)
    const {user_type, user_rol} = getClaimsToken(); // get claims
    
    return (status === 'authenticated' && user_type === 'user' && TypeUsers.Employee.includes(user_rol))
        ? children
        : <LoginUserPage/>
}