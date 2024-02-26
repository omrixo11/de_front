// addressSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchAddressSuggestions } from '../thunks/addressThunk';

const initialState = {
  suggestions: [],
  loading: false,
  error: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddressSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchAddressSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default addressSlice.reducer;
