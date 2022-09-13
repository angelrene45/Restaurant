import { Routes, Route } from 'react-router-dom';

import Login from './Components/Login/Login';
import Layout from './Layout/Layout';

function App() {
  return (
    <Layout>
      <Login></Login>
    </Layout>
    
  );
}

export default App;
