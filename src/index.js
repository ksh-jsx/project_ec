import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import "./assets/css/main.css";
import "./assets/css/loading.css";

import {Provider} from 'react-redux';
import store from './stores/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);