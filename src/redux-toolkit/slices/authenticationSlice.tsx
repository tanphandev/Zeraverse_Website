import { createSlice } from "@reduxjs/toolkit";
const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    currentUser: true,
  },
  reducers: {},
});

export default authenticationSlice;
