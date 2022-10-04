import { createSlice } from "@reduxjs/toolkit";

export const stateSlice = createSlice({
  name: "tokenSlice",
  initialState: {
    mode: "WELCOME",
    current_page: "SIGNIN",
  },
  reducers: {
    SET_STATE: (state, action) => {
      state.mode = action.payload.mode;
      state.current_page = action.payload.page;
    },
  },
});

export default stateSlice;
export const { SET_STATE } = stateSlice.actions;
