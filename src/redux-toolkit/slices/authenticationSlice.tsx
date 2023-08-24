import { createSlice } from "@reduxjs/toolkit";
const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    currentUser: false,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export default authenticationSlice;
