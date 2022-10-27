import { Routes, Route, Navigate } from 'react-router-dom'

import { PageNotFound } from '../pages/PageNotFound'
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { AdminRoutes } from '../apps/admin/routes/AdminRoutes';
import { CustomerRoutes } from '../apps/customer/routes/CustomerRoutes';
import { AdminRoute } from './AdminRoute';
import { CustomerRoute } from './CustomerRoute';
import { EmployeeRoute } from './EmployeeRoute';
import { EmployeeRoutes } from '../apps/employee/routes/EmployeeRoutes';

export const AppRouter = () => {

    return (
        <Routes>   
            <Route path='*' element={<PageNotFound />}/>
            <Route path='/auth/*' element={<AuthRoutes />}/>
            <Route path='/' element={<Navigate to='/auth/login'/>}/>

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