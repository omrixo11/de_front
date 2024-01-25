// YourThunkFile.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import propertyService from '@/services/property.service';

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async () => {
    try {
      const apiData = await propertyService.getAllArticles();
      return apiData;
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  }
);
