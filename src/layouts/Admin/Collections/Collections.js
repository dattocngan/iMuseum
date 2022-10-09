import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Modal from "../../../UI/Modal";
import Loader from "../../../UI/Loader";

const AddCollection = lazy(() => import("views/Collections/AddCollection/AddCollection"));
const Collection = lazy(() => import( "views/Collections/Collection/Collection"));
const AllCollections = lazy(() => import("../../../views/Collections/AllCollections"));

const Collections = () => {
  return (
    <Suspense fallback={<Modal children={<Loader/>}/>}>
      <Switch>
        <Route path="/admin/collections" component={AllCollections} exact/>
        <Route path="/admin/collections/add" component={AddCollection} exact/>
        <Route path="/admin/collections/:id" component={Collection} exact/>
        <Redirect to="/admin/collections"/>
      </Switch>
    </Suspense>

  );
};

export default Collections;
