import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpRequest } from "@/utils/httpRequest";
import apiURL from "@/utils/apiURL";
import { SHOP_ITEM } from "@/utils/constants";
const shopSlice = createSlice({
  name: "shop",
  initialState: {
    isLoading: false,
    avatarShop: null,
    shopCategories: null,
    shop: {},
    error: null,
  } as any,
  reducers: {
    setAvatarShop: (state, action) => {
      state.avatarShop = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShopCategories.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getShopCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shopCategories = action.payload;
      })
      .addCase(getShopCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getShopItem.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getShopItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shop[action.payload.shop_item] = action.payload.items;
      })
      .addCase(getShopItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default shopSlice;

export const getShopCategories = createAsyncThunk(
  "shop/getShopCategories",
  async (data: {}, { rejectWithValue }) => {
    try {
      const { data } = await httpRequest.get(apiURL.get_shop_categories);
      const categoryList = data?.data;
      return categoryList;
    } catch (e: any) {
      throw e;
    }
  }
);

export const getShopItem = createAsyncThunk(
  "shop/getShopItem",
  async (
    itemShopData: {
      shop_item_id: number;
      shop_item: SHOP_ITEM;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await httpRequest.get(
        apiURL.get_item_shop(itemShopData.shop_item_id)
      );
      const itemDetail = data?.data?.rows;
      const payload = {
        shop_item: itemShopData.shop_item,
        items: itemDetail,
      };
      console.log("payload", payload);
      return payload;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);

export const buyAvatarShop = async (avatarId: number) => {
  try {
    const { data } = await httpRequest.post(apiURL.buy_avatar, {
      item: avatarId,
    });
    return data;
  } catch (e: any) {
    throw e;
  }
};
