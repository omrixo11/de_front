import { createSlice } from '@reduxjs/toolkit';
import { fetchProperties } from '../thunks/propertyThunks';

const initialState = {
  checkedTransactionType: 'Tout',
  checkedEtatPropriete: 'Tout',
  properties: [],
  loading: false,
  error: null,
  filters: {
    minPrice: 0,
    maxPrice: 100000,
  },
  selectedPropertyTypes: [],
  bedrooms: 0,
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
    setMinPrice: (state, action) => {
      state.filters.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.filters.maxPrice = action.payload;
    },

    setTransactionType: (state, action) => {
      state.checkedTransactionType = action.payload;
    },
    setEtatPropriete: (state, action ) => {
      state.checkedEtatPropriete = action.payload;
    },
    setPropertyTypes: (state, action) => {
      state.selectedPropertyTypes = action.payload;
    },
    setBedroomFilter: (state, action) => {
      state.bedrooms = action.payload;
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
  setMinPrice,
  setMaxPrice,
  setTransactionType,
  setEtatPropriete,
  setPropertyTypes,
  setBedroomFilter,
} = propertySlice.actions;

export default propertySlice.reducer;
