import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "@/services/authenticationSlice";
import searchSlice from "@/services/searchSlice";
import globalLoadingSlice from "@/services/globalLoadingSlice";

export const store = configureStore({
  reducer: {
    globalLoading: globalLoadingSlice.reducer,
    authentication: authenticationSlice.reducer,
    search: searchSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
