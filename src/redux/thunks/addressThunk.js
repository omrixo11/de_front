import { createAsyncThunk } from '@reduxjs/toolkit';
import addressService from '@/services/address.service';

// Async thunk for fetching address suggestions
export const fetchAddressSuggestions = createAsyncThunk(
    'address/fetchAddressSuggestions',
    async (input) => {
      try {
        // Call the appropriate service methods for regions, cities, and neighborhoods
        const regionSuggestions = await addressService.getRegionSuggestions(input);
        const villeSuggestions = await addressService.getVilleSuggestions(input);
        const quartierSuggestions = await addressService.getQuartierSuggestions(input);

        // Merge the suggestions from all three types
        const suggestions = [
          ...regionSuggestions,
          ...villeSuggestions,
          ...quartierSuggestions
        ];

        console.log('Fetched suggestions:', suggestions);

        return suggestions;
      } catch (error) {
        throw error;
      }
    }
);
