import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("loggedUser");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: storedUser ? true : false,
    user: storedUser ? JSON.parse(storedUser) : null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("loggedUser");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
