// Redux Thunks - propertyThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import propertyService from '@/services/property.service';

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async (_, { dispatch, getState }) => {
    const allProperties = await propertyService.getAllArticles();
    const { searchQuery } = getState().search;
    let filteredProperties = allProperties;
    if (searchQuery.trim() !== '') {
      filteredProperties = await propertyService.searchArticles(searchQuery, dispatch);
    }
    return filteredProperties;
  }
);
