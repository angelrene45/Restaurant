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
          <Route path='/' element={ (authorization && role === 'admin') ? <DashAdmin />  : (authorization && role !== 'admin') ? <DashEmp /> : <Login /> } />
          <Route path='/home' element={ (authorization && role) === 'admin' ? <DashAdmin />  : (authorization && role !== 'admin') ? <DashEmp /> : <Login /> } />
          <Route path='/menu_reg' element={ (authorization && role) === 'admin' ? <DashAdmin />  : (authorization && role !== 'admin') ? <DashEmp /> : <Login /> } />
          <Route path='/sales' element={ authorization ?  <DashClie /> :  <Login />  } /> 
          <Route path='/employees' element={ authorization ? <DashEmp /> : <Login />   } />
          <Route path='*' element={ (authorization && role) === 'admin' ? <DashAdmin />  : (authorization && role !== 'admin') ? <DashEmp /> : <Login /> } />
        </Routes>
      </Layout>
  );
};

export default App;
