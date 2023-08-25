import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./slices/authenticationSlice";
import { searchSlice } from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
    search: searchSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
