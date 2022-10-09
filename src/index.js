import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.10.0";
import axios from "axios";
import store from "./store";
import {authActions} from "./store/auth";
import App from "App";

/** Intercept any unauthorized request.
 * dispatch logout action accordingly **/
axios.defaults.baseURL = "http://localhost:8080/v1/";
const UNAUTHORIZED = 401;
const { dispatch } = store; // direct access to redux store.

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    if (status === UNAUTHORIZED) {
      dispatch(authActions.logout());
    }
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
