import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "@/services/auth.service";
import searchSlice from "@/services/searchSlice";
import globalLoadingSlice from "@/services/globalLoadingSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
    globalLoading: globalLoadingSlice.reducer,
    search: searchSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
