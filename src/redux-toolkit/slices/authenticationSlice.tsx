import { createSlice } from "@reduxjs/toolkit";
const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    currentUser: true,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export default authenticationSlice;
