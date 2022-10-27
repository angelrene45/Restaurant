import { Navigate, Route, Routes } from 'react-router-dom';
import { CustomerPage } from '../pages';


export const CustomerRoutes = () => {
  return (
    <Routes>
        <Route path="home" element={ <CustomerPage /> } />
      
        <Route path='/*' element={ <Navigate to="/customer/home" /> } />
    </Routes>
  )
}