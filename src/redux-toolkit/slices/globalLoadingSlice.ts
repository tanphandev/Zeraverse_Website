import { createSlice } from "@reduxjs/toolkit";

const globalLoadingSlice = createSlice({
  name: "globalLoading",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setGlobalLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export default globalLoadingSlice;
