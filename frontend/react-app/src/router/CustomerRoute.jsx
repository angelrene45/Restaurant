import { useSelector } from 'react-redux'
import { LoginUserPage } from '../auth/pages'
import { TypeUsers } from '../utils'


export const CustomerRoute = ({ children }) => {

    // const {authorization, role} = useSelector(state => state.authReducer)
    
    // return (authorization && role === TypeUsers.Customer)
    //     ? children
    //     : <LoginUserPage/>
    return children
   
}