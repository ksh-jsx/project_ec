import { createSlice } from "@reduxjs/toolkit";

export const stateSlice = createSlice({
  name: "tokenSlice",
  initialState: {
    mode: "WELCOME",
    current_page: "SIGNIN",
    user_name: "",
    id: "",
  },
  reducers: {
    SET_STATE: (state, action) => {
      state.mode = action.payload.mode;
      state.current_page = action.payload.page;
      state.user_name = action.payload.user_name;
      state.id = action.payload.id;
    },
  },
});

export default stateSlice;
export const { SET_STATE } = stateSlice.actions;
