import { useSelector }from 'react-redux';
import { Routes, Route } from 'react-router-dom'

import './css/style.css';

import DashAdmin from './pages/admin/DashAdmin';
import DashClie from './pages/clients/DashClie';
import DashEmp  from './pages/employees/DashEmp';
import Login from './components/login/Login'
import Layout from './layout/Layout';

const App = () => {

  const authorization = useSelector(state => state.LoginReducer.authorization)
  const role = useSelector(state => state.LoginReducer.role)

  return (  
      <Layout>
        <Routes>   
          <Route path='/' element={ (authorization && role === 'admin') ? <DashAdmin />  : (authorization && role !== 'admin') ? <DashEmp /> : <Login /> } />
          <Route path='/admin/:params' element={ (authorization && role === 'admin') && <DashAdmin />   } />
          <Route path='/home/:params' element={ (authorization && role) === 'admin' ? <DashAdmin />  : (authorization && role !== 'admin') ? <DashEmp /> : <Login /> } />
          <Route path='/sales' element={ authorization ?  <DashClie /> :  <Login />  } /> 
          <Route path='/employees' element={ authorization ? <DashEmp /> : <Login />   } />
          <Route path='*' element={ (authorization && role) === 'admin' ? <DashAdmin />  : (authorization && role !== 'admin') ? <DashEmp /> : <Login /> } />
        </Routes>
      </Layout>
  );
};

export default App;
