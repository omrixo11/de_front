import { createSlice } from '@reduxjs/toolkit';
import { fetchProperties } from '../thunks/propertyThunks';

const initialState = {
  properties: [],
  loading: false,
  error: null,
};

const propertySlice = createSlice({
    name: 'property',
    initialState,
    reducers: {
      fetchPropertiesRequest: (state) => {
        state.loading = true;
      },
      fetchPropertiesSuccess: (state, action) => {
        state.loading = false;
        state.properties = action.payload;
        state.error = null;
      },
      fetchPropertiesFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchProperties.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchProperties.fulfilled, (state, action) => {
          state.loading = false;
          state.properties = action.payload;
          state.error = null;
        })
        .addCase(fetchProperties.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
export const {
  fetchPropertiesRequest,
  fetchPropertiesSuccess,
  fetchPropertiesFailure,
} = propertySlice.actions;

export default propertySlice.reducer;
