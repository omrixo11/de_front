import { createAsyncThunk } from '@reduxjs/toolkit';
import propertyService from '@/services/property.service';
import { setSearchQuery } from '../slices/searchSlice';

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async (_, { dispatch, getState }) => {
    try {
      const { searchQuery } = getState().search;
      const apiData = await propertyService.getAllArticles(searchQuery);
      // dispatch(setSearchQuery('')); 
      return apiData;
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  }
);
