import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "seach",
  initialState: {
    isOpenSeachModal: false,
  },
  reducers: {
    setIsSeachModal: (state, action) => {
      state.isOpenSeachModal = action.payload;
    },
  },
});
