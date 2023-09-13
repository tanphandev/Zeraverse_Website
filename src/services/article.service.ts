import apiURL from "@/utils/apiURL";
import { httpRequest } from "@/utils/httpRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
  name: "article",
  initialState: {
    isLoading: false,
    newest: null,
    listArticleCategory: null,
    articles: {},
    articleRandom: null,
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
    builder
      .addCase(getArticles.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles[action.payload.category_name] = action.payload.items;
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getArticleRandom.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getArticleRandom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articleRandom = action.payload;
      })
      .addCase(getArticleRandom.rejected, (state, action) => {
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

export const getArticleRandom = createAsyncThunk(
  "articles/getArticleRandom",
  async (data: {}, { rejectWithValue }) => {
    try {
      const { data } = await httpRequest.get(apiURL.get_article_random);
      const articleRandom = data?.data;
      return articleRandom;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);

export const getArticles = createAsyncThunk(
  "articles/getArticles",
  async (articleCate: string, { rejectWithValue }) => {
    try {
      const { data } = await httpRequest.get(apiURL.get_article(articleCate));
      const articleList = data?.data?.articles?.rows;
      const articleData = {
        category_name: articleCate,
        items: articleList,
      };
      return articleData;
    } catch (e: any) {
      return rejectWithValue(e?.message);
    }
  }
);
