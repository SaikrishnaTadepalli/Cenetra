import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isLoggedIn: boolean;
  userId: string;
}

const initialState: AuthState = {
  isLoggedIn: true,
  userId: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userId = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = "";
    },
    permanentlyDeleteUser: (state) => {
      state.isLoggedIn = false;
      state.userId = "";
    },
  },
});

export const { login, logout, permanentlyDeleteUser } = authSlice.actions;

export const fetchUserId = (state) => state.auth.userId;

export default authSlice.reducer;
