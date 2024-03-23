import axios from 'axios';

// const BASE_URL = "http://localhost:5001/newsletter"; // Use this for local development
const BASE_URL = "https://dessa.ovh/newsletter"; // Uncomment this for production

class NewsletterService {
    async subscribe(email) {
        try {
            const response = await axios.post(`${BASE_URL}/subscribe`, { email });
            return response.data; // This will return the response data from the server
        } catch (error) {
            console.error('Error subscribing to newsletter:', error.response);
            throw error.response.data; // This throws an error with the response data from the server
        }
    }
}

export default new NewsletterService();
