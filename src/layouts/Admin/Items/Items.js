import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import AllItems from "../../../views/Items/AllItems";
import AddItem from "../../../views/Items/AddItem/AddItem";

const Items = () => {
    return (
        <Switch>
            <Route path="/admin/items" component={AllItems} exact />
            <Route path='/admin/items/add' component={AddItem} exact />
            <Redirect to="/admin/items" />
        </Switch>
    );
};

export default Items;