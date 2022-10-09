import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Modal from "../../../UI/Modal";
import Loader from "../../../UI/Loader";

const AllItems = lazy(() => import("../../../views/Items/AllItems"));
const AddItem = lazy(() => import("../../../views/Items/AddItem/AddItem"));
const Item = lazy(() => import("../../../views/Items/Item/Item"));

const Items = () => {
  return (
    <Suspense fallback={<Modal children={<Loader />} />}>
      <Switch>
        <Route path="/admin/items" component={AllItems} exact />
        <Route path="/admin/items/add" component={AddItem} exact />
        <Route path="/admin/items/:id" component={Item} exact />
        <Redirect to="/admin/items" />
      </Switch>
    </Suspense>
  );
};

export default Items;
