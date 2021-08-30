import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import projectSlice from "./slices/projectSlice";
import userSlice from "./slices/userSlice";
const store = configureStore({
  reducer: {
    userAuth: authSlice,
    project: projectSlice,
    user: userSlice,
  },
});

export default store;
