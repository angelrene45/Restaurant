import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { setLinks } from '../../../store/slices/dashInfo/dashSlice';
import { linksJsonCustomer } from '../../../utils'
import Layout from '../../../layout/Layout';
import { CustomerHomePage, FoodsPage, CartReviewPage, CartPaymentPage, CartConfirmPage, OrderSearchPage, OrderDetailPage } from '../pages';


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
        <Route path="/cart-review" element={<CartReviewPage />} />
        <Route path="/cart-payment" element={<CartPaymentPage />} />
        <Route path="/cart-confirm/:order_id" element={<CartConfirmPage />} />
        <Route path="/order/search" element={<OrderSearchPage />} />
        <Route path="/order/:order_id" element={<OrderDetailPage />} />

        <Route path='/*' element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  )
}