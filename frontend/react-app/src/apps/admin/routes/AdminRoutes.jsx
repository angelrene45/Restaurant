import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { AdminPage } from '../pages';
import { linksJsonAdmin } from '../../../utils'
import Layout from '../../../layout/Layout';
import CategoriesCRUD from '../pages/CategoriesCrud';
import Crud from '../pages/DishCrud';
import { setLinks } from '../../../store/slices/dashInfo/dashSlice';
import { getFoods } from '../../../store/slices/food';

export const AdminRoutes = () => {
  // get sidebar options
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch( setLinks( {links:linksJsonAdmin}));
  });

  return (
    <Layout>
      <Routes>
          <Route path="home" element={ <AdminPage /> } />
          <Route path="food/categories" element={ <CategoriesCRUD /> } />
          <Route path="food/dishes" element={ <Crud getList={getFoods}/> } />
        
          <Route path='/*' element={ <Navigate to="/admin/home" /> } />
      </Routes>
    </Layout>
  )
}