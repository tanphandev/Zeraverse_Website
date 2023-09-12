import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpRequest } from "@/utils/httpRequest";
import apiURL from "@/utils/apiURL";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    isLoading: false,
    gameList: null,
    gameCategories: null,
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
