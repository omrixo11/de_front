import axios from 'axios';
import { purshasePlanSuccess, setLoading, setLoadingComplete } from '@/redux/slices/authSlice';

// const BASE_URL = "http://localhost:5001/user";
const BASE_URL = "https://dessa.ovh/user";

class UserService {

  async purchasePlan(userId, planId, isYearlyBilling, token, dispatch) {
    try {
      dispatch(setLoading());
      const response = await axios.post(`${BASE_URL}/${userId}/purchase-plan/${planId}`, {
        isYearlyBilling,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      // dispatch(purshasePlanSuccess());
      dispatch(setLoadingComplete());
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoadingComplete());
    }
  }

  async toggleFavorite(userId, articleId, token) {
    try {
      const response = await axios.post(`${BASE_URL}/${userId}/toggle-favorite/${articleId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token passed as a parameter
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getFavoriteArticles(userId, token) {
    try {
        const response = await axios.get(`${BASE_URL}/${userId}/favorites`, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the token passed as a parameter
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

}

export default new UserService();
