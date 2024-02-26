// user.service.js
import { purshasePlanSuccess } from '@/redux/slices/authSlice';
import axios from 'axios';

const BASE_URL = "http://localhost:5001/user";

class UserService {
  async purchasePlan(userId, planId, isYearlyBilling, dispatch) {
    try {
      const response = await axios.post(`${BASE_URL}/${userId}/purchase-plan/${planId}`, {
        isYearlyBilling,
      });
      dispatch(purshasePlanSuccess());
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async toggleFavorite(userId, articleId) {
    try {
      const response = await axios.post(`${BASE_URL}/${userId}/toggle-favorite/${articleId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
}

export default new UserService();
