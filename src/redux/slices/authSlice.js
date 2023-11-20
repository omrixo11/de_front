// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoggedIn: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('authToken', action.payload.token);
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem('authToken');
    },
    signupSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('authToken', action.payload.token);
    },
  },
});

export const { loginSuccess, login, logout, signupSuccess } = authSlice.actions;

export default authSlice.reducer;
