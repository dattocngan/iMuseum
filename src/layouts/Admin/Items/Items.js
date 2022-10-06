import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import AllItems from "../../../views/Items/AllItems";
import AddItem from "../../../views/Items/AddItem/AddItem";
import Item from "../../../views/Items/Item/Item";

const Items = () => {
    return (
        <Switch>
            <Route path="/admin/items" component={AllItems} exact />
            <Route path='/admin/items/add' component={AddItem} exact />
            <Route path='/admin/items/:id' component={Item} exact />
            <Redirect to="/admin/items" />
        </Switch>
    );
};

export default Items;