import { Routes, Route, Navigate } from 'react-router-dom'

import { HomePageDemo } from '../pages/HomePageDemo';
import { PageNotFound } from '../pages/PageNotFound'
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { AdminRoute } from './AdminRoute';
import { CustomerRoute } from './CustomerRoute';
import { EmployeeRoute } from './EmployeeRoute';
import { AdminRoutes } from '../apps/admin/routes/AdminRoutes';
import { EmployeeRoutes } from '../apps/employee/routes/EmployeeRoutes';
import { CustomerRoutes } from '../apps/customer/routes/CustomerRoutes';

export const AppRouter = () => {

    return (
        <Routes>   
            <Route path='/auth/*' element={<AuthRoutes />}/>
            {/* <Route path='/' element={<Navigate to='/customer/'/>}/> */}
            <Route path='/' element={<HomePageDemo/>}/>
            <Route path='*' element={<PageNotFound />}/>

            <Route path="/admin/*" element={
                <AdminRoute>
                    <AdminRoutes />
                </AdminRoute>
            } />

            <Route path="/employee/*" element={
                <EmployeeRoute>
                    <EmployeeRoutes />
                </EmployeeRoute>
            } />
            
            <Route path="/customer/*" element={
                <CustomerRoute>
                    <CustomerRoutes />
                </CustomerRoute>
            } />
            
        </Routes>
    )
}