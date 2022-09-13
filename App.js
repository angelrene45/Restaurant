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
