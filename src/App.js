import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Admin from "layouts/Admin/Admin";
import { Redirect, Route, Switch } from "react-router-dom";
import Auth from "layouts/Auth/Auth";
import { authActions } from "./store/auth";
import { useJwt } from "react-jwt";
import { setHeader } from "./api/http";

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const token = localStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(token);

  useEffect(() => {
    if (token && !isExpired) {
      localStorage.setItem("name", decodedToken?.name);
      setHeader(token);
      dispatch(authActions.login());
    } else {
      dispatch(authActions.logout());
    }
  }, [token, isExpired, decodedToken?.name, dispatch]);

  return (
    <Switch>
      {!isAuth && isAuth !== null && <Route path="/auth" component={Auth} />}
      {!isAuth && isAuth !== null && <Redirect from="/" to="/auth/login" />}
      {isAuth && <Route path="/admin" component={Admin} />}
      {isAuth && <Redirect from="/" to="/admin/items" />}
    </Switch>
  );
};

export default App;
