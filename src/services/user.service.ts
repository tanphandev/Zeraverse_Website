import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpRequestAuth } from "@/utils/httpRequestAuth";
import apiURL from "@/utils/apiURL";
import { HallOfFameType, INVENTORY_NAME } from "@/utils/constants";
import { httpRequest } from "@/utils/httpRequest";
const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    otherUserInfo: null,
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
    hallOfFame: {
      zera: null,
      games_played: null,
      playstreak: null,
    },
    achievements: null,
    error: null,
  } as any,
  reducers: {
    setStatistic: (state, action) => {
      state.statistic = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getOtherUserInfo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOtherUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.otherUserInfo = action.payload;
      })
      .addCase(getOtherUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
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
      .addCase(getUserPlaylistGameWithGameSlug.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserPlaylistGameWithGameSlug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.playListGame = action.payload;
      })
      .addCase(getUserPlaylistGameWithGameSlug.rejected, (state, action) => {
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
    builder
      .addCase(getHallOfFame.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getHallOfFame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hallOfFame[action.payload.type] = action.payload.rankingList;
      })
      .addCase(getHallOfFame.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getAchivements.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAchivements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.achievements = action.payload;
      })
      .addCase(getAchivements.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default userSlice;

export const changeUserNameUser = async (username: string, token: string) => {
  try {
    const { data } = await httpRequestAuth.put(
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
    const { data } = await httpRequestAuth.get(apiURL.getUserInfo(userName));
    if (!data.success) {
      throw new Error(data?.error?.message);
    }
    return data;
  } catch (e) {
    throw e;
  }
};

export const getOtherUserInfo = createAsyncThunk(
  "user/getOtherUserInfo",
  async (userName: string, { rejectWithValue }) => {
    try {
      const { data } = await httpRequest.get(
        apiURL.getUserInfo(decodeURIComponent(userName))
      );
      return data?.data;
    } catch (e: any) {
      rejectWithValue(e?.message);
    }
  }
);

export const updateUserProfile = async (userData: {
  avatar: number;
  quote: string;
}) => {
  try {
    const { data } = await httpRequestAuth.put(
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
    const { data } = await httpRequestAuth.put(
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
    const { data } = httpRequestAuth.post(apiURL.claim_daily_bonus, {});
    return data;
  } catch (e: any) {
    throw e;
  }
};

export const getUserInventories = createAsyncThunk(
  "user/getUserInventories",
  async (data: {}, { rejectWithValue }) => {
    try {
      const { data } = await httpRequestAuth.get(apiURL.get_user_inventories);
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
      const { data } = await httpRequestAuth.get(apiURL.get_user_statistic, {
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
      const { data } = await httpRequestAuth.get(apiURL.get_most_played_game, {
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
      const { data } = await httpRequestAuth.get(
        apiURL.get_user_recently_game,
        {
          params: {
            username: encodeUserName,
          },
        }
      );
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
      const { data } = await httpRequestAuth.get(apiURL.get_user_loved_game, {
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
      const { data } = await httpRequestAuth.get(
        apiURL.get_user_playList_game,
        {
          params: {
            username: encodeUserName,
          },
        }
      );
      const playListGame = data?.data;
      return playListGame;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);

export const getUserPlaylistGameWithGameSlug = createAsyncThunk(
  "user/getUserPlaylistGameWithGameSlug",
  async (
    params: {
      username: string;
      game_slug: string;
    },
    { rejectWithValue }
  ) => {
    const encodeUserName = encodeURI(params.username);
    try {
      const { data } = await httpRequestAuth.get(
        apiURL.get_user_playList_game,
        {
          params: {
            username: encodeUserName,
            game_slug: params.game_slug,
          },
        }
      );
      const playListGame = data?.data;
      return playListGame;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);

export const addPlaylistgame = async (playlistName: string) => {
  try {
    const { data } = await httpRequestAuth.post(apiURL.add_user_playList_game, {
      name: playlistName,
    });
    return data;
  } catch (e: any) {
    throw e;
  }
};

export const getUserPlayListItem = async (playListId: number) => {
  try {
    const { data } = await httpRequestAuth.get(
      apiURL.get_user_playlist_game_item(playListId)
    );

    return data;
  } catch (e: any) {
    throw e;
  }
};

export const deleteUserPlayListGame = async (playListId: number) => {
  try {
    const { data } = await httpRequestAuth.delete(
      apiURL.delete_user_playlist_game(playListId)
    );
    return data;
  } catch (e: any) {
    throw e;
  }
};

export const deleteUserPlayListItemGame = async (gameId: number) => {
  try {
    const { data } = await httpRequestAuth.delete(
      apiURL.delete_user_playlist_item_game(gameId)
    );
    return data;
  } catch (e: any) {
    throw e;
  }
};

export const addGameIntoPlayList = async (
  game_detail_id: number,
  playlist_id: string
) => {
  try {
    const { data } = await httpRequestAuth.post(apiURL.add_game_into_playlist, {
      game_detail_id,
      playlist_id,
    });
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
      const { data } = await httpRequestAuth.get(
        apiURL.get_user_purchase_history,
        {
          params: {
            username: encodeUserName,
          },
        }
      );
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
      const { data } = await httpRequestAuth.get(apiURL.get_user_rewards, {
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
      const { data } = await httpRequestAuth.get(apiURL.get_contact);
      const contact = data?.data;
      return contact;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);

export const newsletter = async (userData: { name: string; email: string }) => {
  try {
    const { data } = await httpRequestAuth.post(apiURL.newsletter, userData);
    return data;
  } catch (e: any) {
    throw e;
  }
};

export const getHallOfFame = createAsyncThunk(
  "user/getHallOfFame",
  async (type: HallOfFameType, { rejectWithValue }) => {
    try {
      const { data } = await httpRequestAuth.get(apiURL.get_hall_of_fame, {
        params: {
          sort: type,
          filter: "high_to_low",
        },
      });
      const rankingList = data?.data;
      const payload = {
        type,
        rankingList,
      };
      return payload;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);

export const getAchivements = createAsyncThunk(
  "user/getAchivements",
  async (username: string, { rejectWithValue }) => {
    try {
      const { data } = await httpRequestAuth.get(
        apiURL.get_achievements(username)
      );
      const achievements = data?.data;
      return achievements;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);

export const get_all_message_of_room = async (room_id: number) => {
  try {
    const { data } = await httpRequestAuth.get(
      apiURL.get_all_message_of_room(room_id)
    );
    return data;
  } catch (e: any) {
    throw e;
  }
};
