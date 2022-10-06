import React from "react";

import {Switch, Route, Redirect} from "react-router-dom";
import Login from "../../views/Auth/Login/Login";
import Signup from "../../views/Auth/Signup/Signup";
import Verify from "../../views/Auth/Verify/Verify";

const Auth = () => {
  return (
    <Switch>
      <Route path="/auth/login" component={Login} exact/>
      <Route path="/auth/signup" component={Signup} exact/>
      <Route path="/auth/signup/verify" component={Verify} exact/>
      <Redirect to="/auth/login"/>
    </Switch>
  );
};

export default Auth;
