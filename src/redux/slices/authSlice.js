import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  userEmail: "",
  userId:""
};

const authSlice = createSlice({
  name: "authslice",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userId=action.payload.userId;
    },
    setUserLogOut: (state, action) => {
      state.userName = "";
      state.userEmail = "";
      state.userId="";
    },
  },
});

export const { setActiveUser, setUserLogOut } = authSlice.actions;
export default authSlice.reducer;
