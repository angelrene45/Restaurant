import { Navigate, Route, Routes } from 'react-router-dom';

import { FoodsPage } from '../pages';


export const CustomerRoutes = () => {
  return (
    <Routes>
        <Route path="foods" element={ <FoodsPage /> } />
      
        <Route path='/*' element={ <Navigate to="/customer/foods" /> } />
    </Routes>
  )
}