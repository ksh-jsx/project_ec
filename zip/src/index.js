import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import "./styles.css";
import "./loading.css";

import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./module/index";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
