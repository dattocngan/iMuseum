import {createSlice} from "@reduxjs/toolkit";

const initialAuthState = {
    isAuth: null,
    token: ''
};

const authSlide = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.isAuth = true;
            state.token = action.payload;
        },
        logout(state) {
            state.isAuth = false;
            state.token = '';
        }
    }
});

export const authActions = authSlide.actions;

export default authSlide.reducer;
