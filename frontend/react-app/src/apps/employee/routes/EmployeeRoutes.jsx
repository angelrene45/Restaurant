import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { CookPage, EmployeePage } from '../pages';
import { setLinks } from '../../../store/slices/dashInfo/dashSlice';
import { linksJsonEmployees } from '../../../utils'
import Layout from '../../../layout/Layout';

export const EmployeeRoutes = () => {
  // set sidebar customer options
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLinks({ links: linksJsonEmployees }));
  });

  return (
    <Layout>
      <Routes>
        <Route path="home" element={<EmployeePage />} />
        <Route path="cook" element={<CookPage />} />

        <Route path='/*' element={<Navigate to="/employee/home" />} />
      </Routes>
    </Layout>
  )
}