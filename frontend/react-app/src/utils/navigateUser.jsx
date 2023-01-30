import jwt from 'jwt-decode'

import { Navigate } from "react-router-dom"
import { TypeUsers } from "./"

export const navigateUser = () => {
    const token = localStorage.getItem('TOKEN');
    const token_decoded = jwt(token); // decode token
    const {user_type, user_rol} = token_decoded; // get claims

    
    // function that check the role and navigate the user to proper home page
    if (user_type === 'user' && TypeUsers.Admin.includes(user_rol)){ 
        return <Navigate to="/admin"/>
    }
    else if (user_type === 'user' && TypeUsers.Employee.includes(user_rol)) {
        return <Navigate to="/employee"/> 
    }
    else { 
        // get last path 
        const lastPath = localStorage.getItem('lastPath') || "/customer"
        return <Navigate to={lastPath}/>
    }
}