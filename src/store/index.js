import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import titleReducer from "./title";

const store = configureStore({
  reducer: {
    auth: authReducer,
    title: titleReducer,
  },
});

export default store;
