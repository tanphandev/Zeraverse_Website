import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpRequest } from "@/utils/httpRequest";
import apiURL from "@/utils/apiURL";
import { INVENTORY_NAME } from "@/utils/constants";
const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    inventories: {
      categories: [],
      avatar: [],
      cover: [],
      contact: null,
    },
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
      .addCase(getUserInventories.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserInventories.fulfilled, (state, action) => {
        state.isLoading = false;
        const categories = action.payload?.item_categories;
        const inventoryItem = action.payload?.user_inventory?.rows;
        const inventoryAvatar: any = [];
        const inventoryCover: any = [];
        // get inventory item id
        const avatarId = categories.find(
          (inventoryItem: any) => inventoryItem.item === INVENTORY_NAME.AVATAR
        )?.id;
        const coverId = categories.find(
          (inventoryItem: any) => inventoryItem.item === INVENTORY_NAME.COVER
        )?.id;
        // get item list for inventory item
        inventoryItem.forEach((item: any) => {
          if (item?.item_info?.category_item_id === avatarId) {
            inventoryAvatar.push(item);
          } else if (item?.item_info?.category_item_id === coverId) {
            inventoryCover.push(item);
          }
        });
        // set state
        state.inventories.categories = categories;
        state.inventories.avatar = inventoryAvatar;
        state.inventories.cover = inventoryCover;
      })
      .addCase(getUserInventories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
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
    builder
      .addCase(getContact.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contact = action.payload;
      })
      .addCase(getContact.rejected, (state, action) => {
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

export const updateUserProfile = async (userData: {
  avatar: number;
  quote: string;
}) => {
  try {
    const { data } = await httpRequest.put(
      apiURL.update_user_profile,
      userData
    );
    if (!data.success) {
      throw new Error(data?.error?.message);
    }
    return data;
  } catch (e) {
    throw e;
  }
};

export const updateCoverProfle = async (userData: { cover: number }) => {
  try {
    const { data } = await httpRequest.put(
      apiURL.update_user_profile,
      userData
    );
    if (!data.success) {
      throw new Error(data?.error?.message);
    }
    return data;
  } catch (e) {
    throw e;
  }
};

export const claimDailyBonus = async () => {
  try {
    const { data } = httpRequest.post(apiURL.claim_daily_bonus, {});
    return data;
  } catch (e: any) {
    throw e;
  }
};

export const getUserInventories = createAsyncThunk(
  "user/getUserInventories",
  async (data: {}, { rejectWithValue }) => {
    try {
      const { data } = await httpRequest.get(apiURL.get_user_inventories);
      const userInventories = data?.data;
      return userInventories;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);

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

export const getUserPlayListItem = async (playListId: number) => {
  try {
    const { data } = await httpRequest.get(
      apiURL.get_user_playlist_game_item(playListId)
    );

    return data;
  } catch (e: any) {
    throw e;
  }
};

export const deleteUserPlayListGame = async (playListId: number) => {
  try {
    const { data } = await httpRequest.delete(
      apiURL.delete_user_playlist_game(playListId)
    );
    return data;
  } catch (e: any) {
    throw e;
  }
};

export const deleteUserPlayListItemGame = async (gameId: number) => {
  try {
    const { data } = await httpRequest.delete(
      apiURL.delete_user_playlist_item_game(gameId)
    );
    return data;
  } catch (e: any) {
    throw e;
  }
};

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

export const getContact = createAsyncThunk(
  "user/getContact",
  async (data: {}, { rejectWithValue }) => {
    try {
      const { data } = await httpRequest.get(apiURL.get_contact);
      const contact = data?.data;
      return contact;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);

export const newsletter = async (userData: { name: string; email: string }) => {
  try {
    const { data } = await httpRequest.post(apiURL.newsletter, userData);
    return data;
  } catch (e: any) {
    throw e;
  }
};
