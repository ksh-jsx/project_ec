import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./assets/css/main.css";
import "./assets/css/loading.css";

import { Provider } from "react-redux";
import store from "./stores/toolKitStore";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);
