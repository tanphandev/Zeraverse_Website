import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpRequest } from "@/utils/httpRequest";
import apiURL from "@/utils/apiURL";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    isLoading: false,
    gameCategories: null,
    game: {},
    gameList: null,
    gameDetail: {
      gameInfo: null,
      hallOfFame: null,
    },
    popularGame: null,
    error: null,
  } as any,
  reducers: {},
  extraReducers: (builder) => {
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
      .addCase(getGame.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.game[action.payload.category_name] = {
          description: action.payload.description,
          detail: action.payload.items,
          otherCategory: action.payload.otherCategory,
        };
      })
      .addCase(getGame.rejected, (state, action) => {
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
    builder
      .addCase(getInfoGameOfGameDetail.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getInfoGameOfGameDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gameDetail.gameInfo = action.payload;
      })
      .addCase(getInfoGameOfGameDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getHallOfFameOfGame.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getHallOfFameOfGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gameDetail.hallOfFame = action.payload;
      })
      .addCase(getHallOfFameOfGame.rejected, (state, action) => {
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

export const getGame = createAsyncThunk(
  "game/getGame",
  async (game_category_slug: string, { rejectWithValue }) => {
    try {
      const { data } = await httpRequest.get(
        apiURL.get_all_game_of_category(game_category_slug)
      );
      const categoryDescription = data?.data?.game_category?.description;
      const allGameOfCategory = data?.data?.game_category?.game_detail;
      const otherCategory = data?.data?.other_category;
      const payload = {
        category_name: game_category_slug,
        description: categoryDescription,
        items: allGameOfCategory,
        otherCategory: otherCategory,
      };
      return payload;
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

export const getInfoGameOfGameDetail = createAsyncThunk(
  "game/getInfoGameOfGameDetail",
  async (game_slug: string, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await httpRequest.get(apiURL.get_game_detail(game_slug));
      const gameInfo = data?.data;
      if (data?.success) {
        dispatch(getHallOfFameOfGame(gameInfo?.slug));
      }
      return gameInfo;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);

export const getHallOfFameOfGame = createAsyncThunk(
  "game/getHallOfFameOfGame",
  async (game_slug: string, { rejectWithValue }) => {
    try {
      const { data } = await httpRequest.get(
        apiURL.get_hall_of_fame_of_game(game_slug)
      );
      return data.data;
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

export const love_game = async (game_detail_id: number) => {
  try {
    const { data } = await httpRequest.post(apiURL.love_game, {
      game_detail_id,
    });
    return data;
  } catch (e: any) {
    throw e;
  }
};
