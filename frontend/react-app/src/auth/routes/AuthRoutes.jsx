import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginCustomerPage, RegisterCustomerPage, LoginUserPage } from '../pages';


export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="login/user" element={ <LoginUserPage /> } />
        <Route path="login/customer" element={ <LoginCustomerPage /> } />
        <Route path="register/customer" element={ <RegisterCustomerPage /> } />
        
        <Route path='/*' element={ <Navigate to="/auth/login/customer" /> } />
    </Routes>
  )
}