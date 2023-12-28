// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoggedIn: false,
  token: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;
      state.isLoggedIn = true;
      state.token = token;
      state.user = user;
      localStorage.setItem('authToken', token);
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
      const { token, user } = action.payload;
      state.isLoggedIn = true;
      state.token = token;
      state.user = user;
      localStorage.setItem('authToken', token);
    },
    verifyEmailSuccess: (state) => {
      state.user = { ...state.user, isEmailVerified: true };
    },
    purshasePlanSuccess: (state) => {
      state.user = { ...state.user, isOnPlan: true };
    },
    
    // Action to set loading to true
    setLoading: (state) => {
      state.loading = true;
    },

    // Action to set loading to false
    setLoadingComplete: (state) => {
      state.loading = false;
    },
  },
});

export const {
  loginSuccess,
  login,
  logout,
  signupSuccess,
  verifyEmailSuccess,
  purshasePlanSuccess,
  setLoading, 
  setLoadingComplete,
} = authSlice.actions;

export default authSlice.reducer;
