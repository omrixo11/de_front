// adress.service.js
import axios from 'axios';

const BASE_URL = "http://localhost:5001";

class AdressService {

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
}

export default new AdressService();
