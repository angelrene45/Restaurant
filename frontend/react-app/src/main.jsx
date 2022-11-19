import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider }from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react';

import { App } from './App';
import { store, persistor } from './store';
import { Loading } from './components/items/Spinner';
import './css/style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading/>} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  // </React.StrictMode>
);
