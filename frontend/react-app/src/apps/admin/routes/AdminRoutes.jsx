import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { AdminPage } from '../pages';
import { linksJsonAdmin } from '../../../utils'
import Layout from '../../../layout/Layout';
import Crud from '../pages/dish_crud/DishCrud';
import { setLinks } from '../../../store/slices/dashInfo/dashSlice';
import { getFoods, deleteFood } from '../../../store/slices/food';
import { CategoryPage } from '../pages/category_crud';
import FormCrud from '../pages/dish_crud/FormCrud';
import { UserPage } from '../pages/user_crud';

export const AdminRoutes = () => {
  // set sidebar admin options
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLinks({links: linksJsonAdmin}));
  });

  return (
    <Layout>
      <Routes>
          <Route path="home" element={ <AdminPage /> } />
          <Route path="food/categories" element={ <CategoryPage /> } />
          <Route path="food/dishes" element={ <Crud getList={getFoods} delete={deleteFood}/> } />
          <Route path="food/create_food/" element={ <FormCrud /> } />
          <Route path="food/create_food/:id" element={ <FormCrud /> } />
          <Route path="user/" element={ <UserPage /> } />
        
          <Route path='/*' element={ <Navigate to="/admin/home" /> } />
      </Routes>
    </Layout>
  )
}