import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import AddCollection from 'views/Collections/AddCollection/AddCollection';
import AllCollections from "../../../views/Collections/AllCollections";

const Collections = () => {
  return (
    <Switch>
      <Route path="/admin/collections" component={AllCollections} exact/>
      <Route path='/admin/collections/add' component={AddCollection} exact/>
      <Redirect to="/admin/collections"/>
    </Switch>
  );
};

export default Collections;