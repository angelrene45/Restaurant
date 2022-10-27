import { Navigate, Route, Routes } from 'react-router-dom';
import { EmployeePage } from '../pages';

export const EmployeeRoutes = () => {
  return (
    <Routes>
        <Route path="home" element={ <EmployeePage /> } />
      
        <Route path='/*' element={ <Navigate to="/employee/home" /> } />
    </Routes>
  )
}