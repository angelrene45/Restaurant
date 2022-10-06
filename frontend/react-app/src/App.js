<<<<<<< HEAD
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
=======
import { useSelector }from 'react-redux';
import { Routes, Route } from 'react-router-dom'

import DashAdmin from './pages/Admin/DashAdmin';
import DashClie from './pages/Clients/DashClie';
import DashEmp  from './pages/Employees/DashEmp';
import Login from './Components/Login/Login'
import Layout from './Layout/Layout';

const App = () => {

  const authorization = useSelector(state => state.LoginReducer.authorization)
  const role = useSelector(state => state.LoginReducer.role)

  return (  
      <Layout>
        <Routes>   
          <Route path='/' element={ (authorization && role) === 'admin' ? <DashAdmin />  : (authorization && role !== 'admin') ? <DashEmp /> : <Login /> } />
          <Route path='/home' element={ (authorization && role) === 'admin' ? <DashAdmin />  : (authorization && role !== 'admin') ? <DashEmp /> : <Login /> } />
          <Route path='/sales' element={ authorization ?  <DashClie /> :  <Login />  } /> 
          <Route path='/employees' element={ authorization ? <DashEmp /> : <Login />   } />
          <Route path='*' element={ (authorization && role) === 'admin' ? <DashAdmin />  : (authorization && role !== 'admin') ? <DashEmp /> : <Login /> } />
        </Routes>
      </Layout>
>>>>>>> refs/remotes/origin/FrontBeto
  );
};

export default App;
