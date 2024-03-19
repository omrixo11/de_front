// contact.service.js
import { setLoading, setLoadingComplete } from '@/redux/slices/authSlice';
import axios from 'axios';
// 
const BASE_URL = "http://localhost:5001/contact";
// const BASE_URL = "https://dessa.ovh/contact";

class ContactService {
    async submitContactForm(data, dispatch) {
        try {
            dispatch(setLoading());
            const response = await axios.post(`${BASE_URL}`, data);
            return response.data;
        } catch (error) {
            dispatch(setLoadingComplete());
            console.error("There was an error submitting the contact form");
        }
        finally {
            dispatch(setLoadingComplete());
        }
    }
}

export default new ContactService();
