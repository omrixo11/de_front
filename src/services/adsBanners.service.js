// adress.service.js
import axios from 'axios';

// const BASE_URL = "http://localhost:5001";
const BASE_URL = "https://dessa.ovh";

class adsBannersService {

  async getAllAdsBanners() {
    try {
      const response = await axios.get(`${BASE_URL}/ads-banners`);
      return response.data; 
    } catch (error) {
      console.error("Failed to fetch ads banners:", error);
      throw error;
    }
  }

  async initiateAdsBannerPurchase(userId, formData) {
    try {
      const response = await axios.post(`${BASE_URL}/user/${userId}/ads-banners/purchase`, formData);
      return response.data;
    } catch (error) {
      console.error("Failed to initiate ads banner purchase:", error);
      throw error;
    }
  }

}

export default new adsBannersService();
