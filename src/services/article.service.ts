import apiURL from "@/utils/apiURL";
import { httpRequest } from "@/utils/httpRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
  name: "article",
  initialState: {
    isLoading: false,
    newest: null,
    listArticleCategory: null,
    error: null,
  } as any,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewest.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getNewest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newest = action.payload;
      })
      .addCase(getNewest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getListArticleCategory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getListArticleCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listArticleCategory = action.payload;
      })
      .addCase(getListArticleCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default articleSlice;

export const getNewest = createAsyncThunk(
  "articles/getNewest",
  async (data: {}, { rejectWithValue }) => {
    try {
      const { data } = await httpRequest.get(apiURL.get_newest);
      const newest = data?.data?.rows;
      return newest;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);

export const getListArticleCategory = createAsyncThunk(
  "articles/getListArticleCategory",
  async (data: {}, { rejectWithValue }) => {
    try {
      const { data } = await httpRequest.get(apiURL.get_article_categories);
      const articleCategory = data?.data?.rows;
      return articleCategory;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);
