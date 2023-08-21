import { createSlice } from "@reduxjs/toolkit";
const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    currentUser: false,
  },
  reducers: {},
});

export default authenticationSlice;
