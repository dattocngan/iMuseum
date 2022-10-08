import { createSlice } from "@reduxjs/toolkit";

const initialTitleState = "iMuseum";

const titleSlide = createSlice({
  name: "title",
  initialState: initialTitleState,
  reducers: {
    setTitle(state, action) {
      return initialTitleState + action.payload;
    },
  },
});

export const titleActions = titleSlide.actions;

export default titleSlide.reducer;
