import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "@/services/auth.service";
import shopSlice from "@/services/shop.service";

export const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
    shop: shopSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
