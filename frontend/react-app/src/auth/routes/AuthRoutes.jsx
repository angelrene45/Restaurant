import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginCustomerPage, RegisterCustomerPage, LoginPage } from '../pages';


export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="login" element={ <LoginPage /> } />
        <Route path="login/customer" element={ <LoginCustomerPage /> } />
        <Route path="register/customer" element={ <RegisterCustomerPage /> } />
        {/* <Route path="register" element={ <RegisterPage /> } /> */}
        
        <Route path='/*' element={ <Navigate to="/auth/login" /> } />
    </Routes>
  )
}