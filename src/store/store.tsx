import { configureStore } from "@reduxjs/toolkit";
import shopSlice from "@/services/shop.service";
import userSlice from "@/services/user.service";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    shop: shopSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
