import { nonTokenRequireAPIs } from "@/api/api";
import ApiCaller from "@/api/apiCaller";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";
const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isLoading: false,
    currentUser: "",
    error: null,
  } as any,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginEmail.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginEmail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(loginEmail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      setCookie("token", state.currentUser.token);
    });
  },
});

export default authenticationSlice;

export const loginEmail = createAsyncThunk(
  "authentication/loginEmail",
  async (loginUser: LoginUser, { rejectWithValue }) => {
    try {
      const res = await ApiCaller.post(
        nonTokenRequireAPIs.loginEmail,
        loginUser
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
