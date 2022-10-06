<<<<<<< HEAD
<<<<<<< Updated upstream
import logo from './logo.svg';
import './App.css';
import Layout from './Layout/Layout';
import {NavbarAdmin, SidebarAdmin } from "./components";


function App() {
  return (
    <Layout>
      
      
      <div className='fixed md:static bg-sky-900 navbar w-full text-green-400 p-5 m-0'>
        <NavbarAdmin />
      </div>
      <div className='w-40 fixed sidebar  bg-gray-900 shadow-lg shadow-gray-500/90 h-full text-green-300 p-5'>
        <SidebarAdmin />
        </div>
      <Login />
    
    </Layout>
    
  );
}

export default App;
=======
import logo from './logo.svg';
=======
>>>>>>> FrontBeto
import './App.css';
import { useSelector }from 'react-redux';
import { Routes, Route } from 'react-router-dom'


import DashAdmin from './pages/Admin/DashAdmin';
import DashClie from './pages/Clients/DashClie';
import DashEmp  from './pages/Employees/DashEmp';
import Login from './Components/Login/Login'
import Layout from './Layout/Layout';
import {NavbarAdmin, SidebarAdmin } from "./components";


<<<<<<< HEAD
function App() {
  return (
    <Layout>
      
      
      <div className='fixed md:static bg-sky-900 navbar w-full text-green-400 p-5 m-0'>
        <NavbarAdmin />
      </div>
      <div className='w-40 fixed sidebar  bg-gray-900 shadow-lg shadow-gray-500/90 h-full text-green-300 p-5'>
        <SidebarAdmin />
        </div>
      <Login />
    
    </Layout>
    
=======
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
>>>>>>> FrontBeto
  );
};

export default App;
>>>>>>> Stashed changes
