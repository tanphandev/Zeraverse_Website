import { nonTokenRequireAPIs } from "@/api/api";
import ApiCaller from "@/api/apiCaller";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";
import { toast } from "react-toastify";
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
    setUserName: (state, action) => {
      state.currentUser.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginEmail.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.currentUser = action.payload.data;
          setCookie("token", state.currentUser.token);
          state.error = "";
          toast.success("Login Successed");
        } else {
          state.error = action.payload.error;
        }
      })
      .addCase(loginWithGoogle.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.currentUser = action.payload.data;
          setCookie("token", state.currentUser.token);
          state.error = "";
          toast.success("Login Successed");
        } else {
          state.error = action.payload.error;
        }
      })
      .addCase(registerEmail.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(registerEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(
          "A verification email has been sent to you. Please check it!"
        );
      });
  },
});

export default authenticationSlice;

// login With Email
export const loginEmail = createAsyncThunk(
  "authentication/loginEmail",
  async (loginUser: AuthUser, { rejectWithValue }) => {
    try {
      const res = await ApiCaller.post(
        nonTokenRequireAPIs.loginEmail,
        loginUser
      );
      if (!res.success) {
        toast.error(res.error.message);
      }
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Login With Google
export const loginWithGoogle = createAsyncThunk(
  "authentication/loginWithGoogle",
  async (
    googleData: { method: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await ApiCaller.post(
        nonTokenRequireAPIs.loginWithGoogle,
        googleData
      );
      if (!res.success) {
        toast.error(res.error.message);
      }
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerEmail = createAsyncThunk(
  "authentication/registerEmail",
  async (registerUser: AuthUser, { rejectWithValue }) => {
    try {
      const res = await ApiCaller.post(
        nonTokenRequireAPIs.registerEmail,
        registerUser
      );
      if (!res.success) {
        toast.error(res.error.message);
      }
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
