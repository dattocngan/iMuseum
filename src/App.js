import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { authActions } from "./store/auth";
import { decodeToken, useJwt } from "react-jwt";
import { setHeader } from "./api/http";
import Modal from "./UI/Modal";
import Loader from "./UI/Loader";

const Admin = lazy(() => import("layouts/Admin/Admin"));

const Auth = lazy(() => import("layouts/Auth/Auth"));

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const token = localStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(token);

  useEffect(() => {
    if (token && !isExpired) {
      if (!localStorage.getItem("name")) {
        localStorage.setItem("name", decodedToken?.name);
      }
      setHeader(token);
      dispatch(authActions.login());
    } else {
      dispatch(authActions.logout());
    }
  }, [token, isExpired, decodedToken?.name, dispatch]);

  return (
    <Suspense fallback={<Modal children={<Loader />} />}>
      <Switch>
        {!isAuth && isAuth !== null && <Route path="/auth" component={Auth} />}
        {!isAuth && isAuth !== null && <Redirect from="/" to="/auth/login" />}
        {isAuth && <Route path="/admin" component={Admin} />}
        {isAuth && <Redirect from="/" to="/admin/items" />}
      </Switch>
    </Suspense>
  );
};

export default App;
