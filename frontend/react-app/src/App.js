import './App.css';
import { useSelector }from 'react-redux';
import { Routes, Route } from 'react-router-dom'


import DashAdmin from './pages/Admin/DashAdmin';
import DashClie from './pages/Clients/DashClie';
import DashEmp  from './pages/Employees/DashEmp';
import Login from './Components/Login/Login'
import Layout from './Layout/Layout';

const App = () => {

  const authorization = useSelector(state => state.LoginReducer.authorization)

  return (  
      <Layout>
        <Routes>   
              
          <Route path='/' element={ authorization ? <DashAdmin />  : <Login /> } />
          <Route path='/home' element={ authorization ? <DashAdmin />  : <Login /> } />
          <Route path='/sales' element={ authorization && <DashClie /> } /> 
          <Route path='/employees' element={ authorization && <DashEmp/>  } />
          <Route path='*' element={ !authorization ? <Login /> : <DashAdmin /> } />
        </Routes>
      </Layout>
  );
};

export default App;
