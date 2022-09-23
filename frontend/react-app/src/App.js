import './App.css';
import { Provider }from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import DashAdmin from './pages/Admin/DashAdmin';
import DashClie from './pages/Clients/DashClie';
import DashEmp  from './pages/Employees/DashEmp';
import Login from './Components/Login/Login'
import Layout from './Layout/Layout';
import store from './store/Store';

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Router className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<DashAdmin />} />
            <Route path='/sales' element={<DashClie />} />
            <Route path='/employees' element={<DashEmp />} />
          </Routes>
        </Router>
      </Layout>
    </Provider>  
  );
};

export default App;
