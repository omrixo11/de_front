// contact.service.js
import axios from 'axios';

const BASE_URL = "http://localhost:5001/contact";

class ContactService {
    async submitContactForm(data) {
        try {
            const response = await axios.post(`${BASE_URL}`, data);
            return response.data;
        } catch (error) {
            console.error("There was an error submitting the contact form:", error);
            throw error;
        }
    }
}

export default new ContactService();
