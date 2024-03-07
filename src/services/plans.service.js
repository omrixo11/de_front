// plan.service.js
import axios from 'axios';

// const BASE_URL = "http://localhost:5001/plan";
const BASE_URL = "https://dessa.ovh/plan";

class PlanService {
    
    // Get all plans
    async getAllPlans() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error("Error fetching plans");
        }
    }

    // Get a specific plan by ID
    async getPlanById(planId) {
        try {
            const response = await axios.get(`${BASE_URL}/${planId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching plan`);
        }
    }
}

export default new PlanService();
