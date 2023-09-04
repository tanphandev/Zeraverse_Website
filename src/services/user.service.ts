import { nonTokenRequireAPIs } from "@/api/api";
import ApiCaller from "@/api/apiCaller";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";
import { toast } from "react-toastify";
import globalLoadingSlice from "./globalLoadingSlice";
import { httpRequest } from "@/utils/httpRequest";
import apiURL from "@/utils/apiURL";
const authenticationSlice = createSlice({
  name: "user",
  initialState: {
    information: null,
  },
  reducers: {
    setInformation: (state, action) => {
      state.information = action.payload;
    },
  },
});

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
