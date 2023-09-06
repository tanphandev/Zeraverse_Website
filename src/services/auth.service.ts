import { createSlice } from "@reduxjs/toolkit";
import { httpRequest } from "@/utils/httpRequest";
import apiURL from "@/utils/apiURL";
import { ISso } from "@/interface/auth/ISso";
const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    currentUser: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export default authenticationSlice;
// Login with email
export const loginWithEmail = async (loginFormData: IAuthFormData) => {
  try {
    const { data } = await httpRequest.post(
      apiURL.login_with_email,
      loginFormData
    );
    return data;
  } catch (e) {
    throw e;
  }
};

// Login With Facebook
export const loginWithSSO = async (SSOData: ISso) => {
  try {
    const { data } = await httpRequest.post(apiURL.login_with_SSO, SSOData);
    return data;
  } catch (e: any) {
    console.log("error", e);
    throw e;
  }
};

// register user by email
export const registerWithEmail = async (registerData: IAuthFormData) => {
  try {
    const { data } = await httpRequest.post(
      apiURL.register_with_email,
      registerData
    );
    return data;
  } catch (e) {
    throw e;
  }
};

// forgot password
export const forgotPassword = async (forgotData: { email: string }) => {
  try {
    const { data } = await httpRequest.post(apiURL.forgot_password, forgotData);
    return data;
  } catch (e: any) {
    throw e;
  }
};
