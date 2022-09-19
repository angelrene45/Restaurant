import { Routes, Route } from 'react-router-dom';
import { Provider }from 'react-redux'

import Login from './Components/Login/Login';
import Layout from './Layout/Layout';
import store from './store/Store';

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Login />
      </Layout>
    </Provider>
    
  );
}

export default App;
