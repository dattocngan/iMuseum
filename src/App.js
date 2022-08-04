import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import Admin from "layouts/Admin";
import { Route, Redirect, Switch } from "react-router-dom";
import Auth from "layouts/Auth";
import axios from "./api/axios";
import {authActions} from "./store/auth";

const App = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuth);

    useEffect(() => {
        (async () => {
            const {data} =  await axios.post('auth/refresh', {}, {withCredentials: true});
            if (data) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${data['token']}`;
                dispatch(authActions.login(data['token']));
            } else {
                dispatch(authActions.logout());
            }
        })();
    }, []);

    return (
        <Switch>
            {!isAuth && isAuth !== null && <Route path="/auth" component={Auth} />}
            {!isAuth && isAuth !== null && <Redirect from="/" to="/auth/login" />}
            {isAuth && <Route path="/admin" component={Admin} />}
            {isAuth && <Redirect from="/" to="/admin/dashboard" />}
        </Switch>
    );
};

export default App;
