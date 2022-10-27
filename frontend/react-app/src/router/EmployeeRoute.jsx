import { useSelector } from 'react-redux'

import { LoginPage } from '../auth/pages'
import { TypeUsers } from "../utils"


export const EmployeeRoute = ({ children }) => {
    
    const {authorization, role} = useSelector(state => state.LoginReducer)
    
    return (authorization && TypeUsers.Employee.includes(role))
        ? children
        : <LoginPage/>
}