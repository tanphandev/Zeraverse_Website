import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpRequest } from "@/utils/httpRequest";
import apiURL from "@/utils/apiURL";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    isLoading: false,
    gameCategories: null,
    gameList: null,
    popularGame: null,
    error: null,
  } as any,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGamelist.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getGamelist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gameList = action.payload;
      })
      .addCase(getGamelist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getGameCategories.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getGameCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gameCategories = action.payload;
      })
      .addCase(getGameCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getPopularGame.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPopularGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.popularGame = action.payload;
      })
      .addCase(getPopularGame.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default gameSlice;

export const getGamelist = createAsyncThunk(
  "game/getGameList",
  async (params: { page: string; limit: string }, { rejectWithValue }) => {
    try {
      const { data } = await httpRequest.get(apiURL.get_games, {
        params: {
          page: params.page,
          limit: params.limit,
        },
      });
      const avatarShop = data?.data?.rows;
      return avatarShop;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);

export const getGameCategories = createAsyncThunk(
  "game/getGameCategories",
  async (data: {}, { rejectWithValue }) => {
    try {
      const { data } = await httpRequest.get(apiURL.get_game_categories);
      const gameCategories = data?.data;
      return gameCategories;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);

export const getPopularGame = createAsyncThunk(
  "game/getPopularGame",
  async (data: {}, { rejectWithValue }) => {
    try {
      const { data } = await httpRequest.get(apiURL.get_popular_game);
      const popularGames = data?.data;
      return popularGames;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);

export const searchGame = async (keySearch: string) => {
  const encodeKeySearch = encodeURI(keySearch);
  try {
    const { data } = await httpRequest.get(apiURL.search_game, {
      params: {
        keySearch: encodeKeySearch,
      },
    });
    return data?.data;
  } catch (e: any) {
    throw e;
  }
};
