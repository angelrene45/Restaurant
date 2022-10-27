import { Navigate } from "react-router-dom";
import { TypeUsers } from "./typesUser"

export const navigateUser = (role) => {
    // function that check the role and navigate the user to proper home page
    if (role === TypeUsers.Admin){ return <Navigate to="/admin"/> }
    else if (TypeUsers.Employee.includes(role)) { return <Navigate to="/employee"/> }
    else { return <Navigate to="/customer"/> }
}