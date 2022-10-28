import { useSelector } from 'react-redux'
import { LoginPage } from '../auth/pages'
import { TypeUsers } from '../utils'


export const CustomerRoute = ({ children }) => {

    // const {authorization, role} = useSelector(state => state.LoginReducer)
    
    // return (authorization && role === TypeUsers.Customer)
    //     ? children
    //     : <LoginPage/>
    return children
   
}