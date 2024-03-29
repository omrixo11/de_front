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

    // purshasePlanSuccess: (state) => {
    //   state.user = { ...state.user, isOnPlan: true };
    // },

    // purshasePlanSuccess: (state, action) => {
    //   const updatedUser = action.payload;
    //   state.user = updatedUser;
    //   state.user.isOnPlan = true;
    // },

    purshasePlanSuccess: (state, action) => {
      const updatedUser = action.payload;
      const newStateWithToken = { ...updatedUser, token: state.token };
      state.user = newStateWithToken;
    },

    toggleFavoriteSuccess: (state, action) => {
      const articleId = action.payload;
      // Update user's favoriteArticles array
      state.user.favoriteArticles.includes(articleId)
        ? state.user.favoriteArticles = state.user.favoriteArticles.filter(id => id !== articleId)
        : state.user.favoriteArticles.push(articleId);
    },

    updateUser: (state, action) => {
      const updatedUser = action.payload.updatedUser;
      console.log("Updating entire user with:", updatedUser);
      if (updatedUser) {
        // Merge the existing user state with the updated user data
        const updatedState = { ...state.user, ...updatedUser };
        // Preserve the token from the existing state
        updatedState.token = state.token;
        // Update the user state with the merged object
        state.user = updatedState;
        console.log('Updated state after updateUser:', state.user);
      }
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
  toggleFavoriteSuccess,
  updateUserField,
  updateUser,

  setLoading,
  setLoadingComplete,
} = authSlice.actions;

export default authSlice.reducer;
