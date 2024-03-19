// // Redux Thunks - propertyThunks.js
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import propertyService from '@/services/property.service';

// export const fetchProperties = createAsyncThunk(
//   'properties/fetchProperties',
//   async (_, { dispatch, getState }) => {
//     const allProperties = await propertyService.getAllArticles();
//     const { searchQuery } = getState().search;
//     let filteredProperties = allProperties;
//     if (searchQuery.trim() !== '') {
//       filteredProperties = await propertyService.searchArticles(searchQuery, dispatch);
//     }
//     return filteredProperties;
//   }
// );
// Redux Thunks - propertyThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import propertyService from '@/services/property.service';

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async (_, { getState }) => {
    const { searchQuery } = getState().search;
    if (searchQuery.trim() !== '') {
      return await propertyService.searchArticles(searchQuery);
    }
    return await propertyService.getAllArticles();
  }
);
