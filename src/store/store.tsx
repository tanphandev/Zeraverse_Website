import { configureStore } from "@reduxjs/toolkit";
import shopSlice from "@/services/shop.service";
import gameSlice from "@/services/game.service";
import userSlice from "@/services/user.service";
import articleSlice from "@/services/article.service";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    game: gameSlice.reducer,
    shop: shopSlice.reducer,
    article: articleSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
