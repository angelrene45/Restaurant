import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { AdminPage } from '../pages';
import { linksJsonAdmin } from '../../../utils'
import Layout from '../../../layout/Layout';
<<<<<<< Updated upstream
import Crud from '../pages/dish_crud/DishCrud';
import { setLinks } from '../../../store/slices/dashInfo/dashSlice';
import { getFoods, deleteFood } from '../../../store/slices/food';
import { CategoryPage } from '../pages/category_crud';
import FormCrud from '../pages/dish_crud/FormCrud';
import { UserPage } from '../pages/user_crud';
import { CustomerPage } from '../pages/customer_crud';
=======
import CategoriesCRUD from '../pages/categories_crud/CategoriesCrud';
import Crud from '../pages/dish_crud/DishCrud';
import { setLinks } from '../../../store/slices/dashInfo/dashSlice';
import { getFoods, deleteFood } from '../../../store/slices/food';
import FormDish from '../pages/dish_crud/FormDish';
import FormCategories from '../pages/categories_crud/FormCategories';
import FormTables from '../pages/tables_crud/FormTables';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
          <Route path="food/create_food/" element={ <FormCrud /> } />
          <Route path="food/create_food/:id" element={ <FormCrud /> } />
          <Route path="user/" element={ <UserPage /> } />
          <Route path="customer/" element={ <CustomerPage /> } />
=======
          <Route path="food/create_food/" element={ <FormDish /> } />
          <Route path="food/create_categorie/" element={ <FormCategories /> } />
          <Route path="food/create_food/:id" element={ <FormDish /> } />
          <Route path="tables/create_table/" element={ <FormTables /> } />

>>>>>>> Stashed changes
        
          <Route path='/*' element={ <Navigate to="/admin/home" /> } />
      </Routes>
    </Layout>
  )
}