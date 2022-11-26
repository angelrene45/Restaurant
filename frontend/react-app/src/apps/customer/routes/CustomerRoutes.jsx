import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { setLinks } from '../../../store/slices/dashInfo/dashSlice';
import { linksJsonCustomer } from '../../../utils'
import Layout from '../../../layout/Layout';
import { CustomerHomePage, FoodsPage } from '../pages';


export const CustomerRoutes = () => {
  // set sidebar customer options
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLinks({ links: linksJsonCustomer }));
  });

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<CustomerHomePage />} />
        <Route path="/foods" element={<FoodsPage />} />

        <Route path='/*' element={<Navigate to="/customer/foods" />} />
      </Routes>
    </Layout>
  )
}