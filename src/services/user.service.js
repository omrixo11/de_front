// user.service.js
import { purshasePlanSuccess, setLoading, setLoadingComplete } from '@/redux/slices/authSlice';
import axios from 'axios';

// const BASE_URL = "http://localhost:5001";
const BASE_URL = "https://dessa.ovh";

class UserService {
  async purchasePlan(userId, planId, isYearlyBilling, dispatch) {
    try {
      dispatch(setLoading())
      const response = await axios.post(`${BASE_URL}/${userId}/purchase-plan/${planId}`, {
        isYearlyBilling,
      });
      dispatch(purshasePlanSuccess());
      dispatch(setLoadingComplete())
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoadingComplete())
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
