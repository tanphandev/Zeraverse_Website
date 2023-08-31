import { nonTokenRequireAPIs } from "@/api/api";
import ApiCaller from "@/api/apiCaller";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";
import { toast } from "react-toastify";
import globalLoadingSlice from "./globalLoadingSlice";
const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isLoading: false,
    currentUser: "",
    isCheckedForgotPassword: false,
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
      // Status of Login With Email Pasword
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
      // Status of Login With Google
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
      // Status of Login With Facebook
      .addCase(loginWithFacebook.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginWithFacebook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginWithFacebook.fulfilled, (state, action) => {
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
      // Status of Register With Email Password
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
      })
      // Status of Forgot Password
      .addCase(forgotPassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.isCheckedForgotPassword = action.payload.data;
          state.error = "";
          toast.success("Please check your email to reset password");
        } else {
          state.error = action.payload.error;
          toast.error(state.error.message);
        }
      });
  },
});

export default authenticationSlice;

// login With Email
export const loginEmail = createAsyncThunk(
  "authentication/loginEmail",
  async (loginUser: AuthUser, { rejectWithValue, dispatch }) => {
    try {
      //show loading
      dispatch(globalLoadingSlice.actions.setGlobalLoading(true));

      const res = await ApiCaller.post(
        nonTokenRequireAPIs.loginEmail,
        loginUser
      );
      //hide loading
      dispatch(globalLoadingSlice.actions.setGlobalLoading(false));
      if (!res.success) {
        toast.error(res.error.message);
      }
      return res;
    } catch (error: any) {
      //hide loading
      dispatch(globalLoadingSlice.actions.setGlobalLoading(false));
      return rejectWithValue(error.response.data);
    }
  }
);

// Login With Google
export const loginWithGoogle = createAsyncThunk(
  "authentication/loginWithGoogle",
  async (
    googleData: { method: string; token: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      dispatch(globalLoadingSlice.actions.setGlobalLoading(true));
      const res = await ApiCaller.post(
        nonTokenRequireAPIs.loginWithSSO,
        googleData
      );
      dispatch(globalLoadingSlice.actions.setGlobalLoading(false));
      if (!res.success) {
        toast.error(res.error.message);
      }
      return res;
    } catch (error: any) {
      dispatch(globalLoadingSlice.actions.setGlobalLoading(false));
      return rejectWithValue(error.response.data);
    }
  }
);

// Login With Facebook
export const loginWithFacebook = createAsyncThunk(
  "authentication/loginWithFacebook",
  async (
    facebookData: { method: string; token: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      dispatch(globalLoadingSlice.actions.setGlobalLoading(true));
      const res = await ApiCaller.post(
        nonTokenRequireAPIs.loginWithSSO,
        facebookData
      );
      dispatch(globalLoadingSlice.actions.setGlobalLoading(false));
      if (!res.success) {
        toast.error(res.error.message);
      }
      return res;
    } catch (error: any) {
      dispatch(globalLoadingSlice.actions.setGlobalLoading(false));
      return rejectWithValue(error.response.data);
    }
  }
);
//register user with email and password
export const registerEmail = createAsyncThunk(
  "authentication/registerEmail",
  async (registerUser: AuthUser, { rejectWithValue, dispatch }) => {
    try {
      dispatch(globalLoadingSlice.actions.setGlobalLoading(true));
      const res = await ApiCaller.post(
        nonTokenRequireAPIs.registerEmail,
        registerUser
      );
      dispatch(globalLoadingSlice.actions.setGlobalLoading(false));
      if (!res.success) {
        toast.error(res.error.message);
      }
      return res;
    } catch (error: any) {
      dispatch(globalLoadingSlice.actions.setGlobalLoading(false));
      return rejectWithValue(error.response.data);
    }
  }
);
// forgot password
export const forgotPassword = createAsyncThunk(
  "authentication/forgotPassword",
  async (forgotData: { email: string }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(globalLoadingSlice.actions.setGlobalLoading(true));
      const res = await ApiCaller.post(
        nonTokenRequireAPIs.forgotPassword,
        forgotData
      );
      dispatch(globalLoadingSlice.actions.setGlobalLoading(false));
      return res;
    } catch (error: any) {
      dispatch(globalLoadingSlice.actions.setGlobalLoading(false));
      return rejectWithValue(error.response.data);
    }
  }
);
