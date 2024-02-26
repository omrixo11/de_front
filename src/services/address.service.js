// adress.service.js
import axios from 'axios';

const BASE_URL = "http://localhost:5001";

class AddressService {

    async getRegions() {
        try {
            const response = await axios.get(`${BASE_URL}/region`);
            return response.data;
        } catch (error) {
            console.error('Error fetching regions:', error);
            throw error;
        }
    }

    async getVillesByRegion(regionId) {
        try {
            const response = await axios.get(`${BASE_URL}/region/${regionId}/villes`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching villes for region ${regionId}:`, error);
            throw error;
        }
    }

    async getQuartiersByVille(villeId) {
        try {
            const response = await axios.get(`${BASE_URL}/ville/${villeId}/quartiers`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching villes for region ${villeId}:`, error);
            throw error;
        }
    }

    async getRegionSuggestions(input) {
        try {
            const response = await axios.get(`${BASE_URL}/region/suggestions?input=${input}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching region suggestions:', error);
            throw error;
        }
    }

    async getVilleSuggestions(input) {
        try {
            const response = await axios.get(`${BASE_URL}/ville/suggestions?input=${input}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching ville suggestions:', error);
            throw error;
        }
    }

    async getQuartierSuggestions(input) {
        try {
            const response = await axios.get(`${BASE_URL}/quartier/suggestions?input=${input}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching quartier suggestions:', error);
            throw error;
        }
    }
    
}

export default new AddressService();
