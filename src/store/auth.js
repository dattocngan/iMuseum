import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuth: null,
};

const authSlide = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
  },
});

export const authActions = authSlide.actions;

export default authSlide.reducer;
