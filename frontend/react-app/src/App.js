import { Login } from './components'
import './App.css';
import Layout from './Layout/Layout';
import { DashAdmin, DashClie, DashEmp } from './pages'


function App() {
  return (
    <Layout>   
      <Login />
    </Layout>
    
  );
}

export default App;
