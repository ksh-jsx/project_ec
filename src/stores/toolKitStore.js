import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import tokenSlice from "./tokenSlice";
import stateSlice from "./stateSlice";
import mapSlice from "./mapSlice";

const store = configureStore({
  reducer: {
    tokenCounter: tokenSlice.reducer,
    stateCounter: stateSlice.reducer,
    mapCounter: mapSlice.reducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
