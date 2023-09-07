import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpRequest } from "@/utils/httpRequest";
import apiURL from "@/utils/apiURL";
const shopSlice = createSlice({
  name: "shop",
  initialState: {
    isLoading: false,
    avatarShop: null,
    error: null,
  } as any,
  reducers: {
    setAvatarShop: (state, action) => {
      state.avatarShop = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAvatarShop.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAvatarShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.avatarShop = action.payload;
      })
      .addCase(getAvatarShop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default shopSlice;

export const getAvatarShop = createAsyncThunk(
  "shop/getAvatarShop",
  async (data: {}, { rejectWithValue }) => {
    try {
      const { data } = await httpRequest.get(apiURL.get_avatar_shop);
      const avatarShop = data?.data?.rows;
      return avatarShop;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);
