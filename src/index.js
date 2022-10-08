/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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
