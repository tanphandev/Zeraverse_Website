import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpRequest } from "@/utils/httpRequest";
import apiURL from "@/utils/apiURL";
const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    statistic: null,
    rewards: [],
    mostPlayedGame: null,
    recentlyGame: [],
    lovedGame: [],
    playListGame: [],
    purchaseHistory: {},
    error: null,
  } as any,
  reducers: {
    setStatistic: (state, action) => {
      state.statistic = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserStatistic.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserStatistic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.statistic = action.payload;
      })
      .addCase(getUserStatistic.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getUserRewards.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserRewards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rewards = action.payload;
      })
      .addCase(getUserRewards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getMostPlayedGame.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMostPlayedGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mostPlayedGame = action.payload;
      })
      .addCase(getMostPlayedGame.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getUserRecentlyGame.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserRecentlyGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recentlyGame = action.payload;
      })
      .addCase(getUserRecentlyGame.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getUserLovedGame.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserLovedGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lovedGame = action.payload;
      })
      .addCase(getUserLovedGame.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getUserPlayListGame.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserPlayListGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.playListGame = action.payload;
      })
      .addCase(getUserPlayListGame.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getUserPurchaseHistory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserPurchaseHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.purchaseHistory = action.payload;
      })
      .addCase(getUserPurchaseHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default userSlice;

export const changeUserNameUser = async (username: string, token: string) => {
  try {
    const { data } = await httpRequest.put(
      apiURL.update_user_name,
      {
        username,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (!data.success) {
      throw new Error(data?.error?.message);
    }
    return data;
  } catch (e) {
    throw e;
  }
};

export const getUserInfo = async (userName: string) => {
  try {
    const { data } = await httpRequest.get(apiURL.getUserInfo(userName));
    if (!data.success) {
      throw new Error(data?.error?.message);
    }
    return data;
  } catch (e) {
    throw e;
  }
};

export const getUserStatistic = createAsyncThunk(
  "user/getUserStatistic",
  async (username: string, { rejectWithValue }) => {
    const encodeUserName = encodeURI(username);
    try {
      const { data } = await httpRequest.get(apiURL.get_user_statistic, {
        params: {
          username: encodeUserName,
        },
      });
      const userStatistic = data?.data;
      return userStatistic;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);

export const getMostPlayedGame = createAsyncThunk(
  "user/getMostPlayedGame",
  async (username: string, { rejectWithValue }) => {
    const encodeUserName = encodeURI(username);
    try {
      const { data } = await httpRequest.get(apiURL.get_most_played_game, {
        params: {
          username: encodeUserName,
        },
      });
      const mostPlayedGame = data?.data;
      return mostPlayedGame;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);

export const getUserRecentlyGame = createAsyncThunk(
  "user/getUserRecentlyGame",
  async (username: string, { rejectWithValue }) => {
    const encodeUserName = encodeURI(username);
    try {
      const { data } = await httpRequest.get(apiURL.get_user_recently_game, {
        params: {
          username: encodeUserName,
        },
      });
      const recentlyGames = data?.data?.rows;
      return recentlyGames;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);

export const getUserLovedGame = createAsyncThunk(
  "user/getUserLovedGame",
  async (username: string, { rejectWithValue }) => {
    const encodeUserName = encodeURI(username);
    try {
      const { data } = await httpRequest.get(apiURL.get_user_loved_game, {
        params: {
          username: encodeUserName,
        },
      });
      const lovedGames = data?.data;
      return lovedGames;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);

export const getUserPlayListGame = createAsyncThunk(
  "user/getUserPlayListGame",
  async (username: string, { rejectWithValue }) => {
    const encodeUserName = encodeURI(username);
    try {
      const { data } = await httpRequest.get(apiURL.get_user_playList_game, {
        params: {
          username: encodeUserName,
        },
      });
      const playListGame = data?.data;
      return playListGame;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);

export const getUserPurchaseHistory = createAsyncThunk(
  "user/getUserPurchaseHistory",
  async (username: string, { rejectWithValue }) => {
    const encodeUserName = encodeURI(username);
    try {
      const { data } = await httpRequest.get(apiURL.get_user_purchase_history, {
        params: {
          username: encodeUserName,
        },
      });
      const purchaseHistory = data?.data;
      return purchaseHistory;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);

export const getUserRewards = createAsyncThunk(
  "user/getUserRewards",
  async (username: string, { rejectWithValue }) => {
    const encodeUserName = encodeURI(username);
    try {
      const { data } = await httpRequest.get(apiURL.get_user_rewards, {
        params: {
          username: encodeUserName,
        },
      });
      const userRewards = data?.data?.rows;
      return userRewards;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);
