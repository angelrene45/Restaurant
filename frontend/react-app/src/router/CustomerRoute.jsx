import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { LoginUserPage } from '../auth/pages'
import { TypeUsers } from '../utils'


export const CustomerRoute = ({ children }) => {

    const { pathname, search } = useLocation()

    // store last path from customer
    const lastPath = pathname + search;
    localStorage.setItem('lastPath', lastPath)

    // const {authorization, role} = useSelector(state => state.authReducer)
    
    // return (authorization && role === TypeUsers.Customer)
    //     ? children
    //     : <LoginUserPage/>
    return children
   
}