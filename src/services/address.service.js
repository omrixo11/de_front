// adress.service.js
import axios from 'axios';

// const BASE_URL = "http://localhost:5001";
const BASE_URL = "https://dessa.ovh";

class AddressService {


    async getVilles() {
        try {
           
            const response = await axios.get(`${BASE_URL}/ville`);
            
            console.log("Villes response:", response);
           
            return response.data;
        } catch (error) {
            
            console.error('Error fetching villes:', error);
            throw error;
        }
    }


    async getQuartiersByVille(villeId) {
        try {
            const response = await axios.get(`${BASE_URL}/ville/${villeId}/quartiers`);
            console.log("quartier::::",response);
            return response.data;
            
        } catch (error) {
            console.error(`Error fetching villes ${villeId}:`, error);
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
