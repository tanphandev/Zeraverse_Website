import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./slices/authenticationSlice";
import { searchSlice } from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
    search: searchSlice.reducer,
  },
});
