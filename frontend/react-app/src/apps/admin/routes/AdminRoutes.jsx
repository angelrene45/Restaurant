import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { AdminPage } from '../pages';
import { linksJsonAdmin } from '../../../utils'
import Layout from '../../../layout/Layout';
import CategoriesCRUD from '../pages/CategoriesCrud';
import Crud from '../pages/dish_crud/DishCrud';
import { setLinks } from '../../../store/slices/dashInfo/dashSlice';
import { getFoods, deleteFood } from '../../../store/slices/food';
import FormCrud from '../pages/dish_crud/FormCrud';

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
          <Route path="food/dishes" element={ <Crud getList={getFoods} delete={deleteFood}/> } />
          <Route path="food/create_food" element={ <FormCrud /> } />
        
          <Route path='/*' element={ <Navigate to="/admin/home" /> } />
      </Routes>
    </Layout>
  )
}