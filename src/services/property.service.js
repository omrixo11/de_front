// user.service.js
import axios from 'axios';

import { setLoading, setLoadingComplete } from '@/redux/slices/authSlice';

const BASE_URL = "http://localhost:5001";

class PropertyService {

  async createArticle(formData, token, userId, dispatch) {
    try {
      // Dispatch setLoading to set loading to true
      dispatch(setLoading());
      const articleData = new FormData();
      // Append article data to the FormData
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          if (Array.isArray(formData[key])) {
            formData[key].forEach((value) => articleData.append(key, value));
          } else {
            articleData.append(key, formData[key]);
          }
        }
      }

      // Append user ID to the FormData
      articleData.append('userId', userId);

      const response = await axios.post(`${BASE_URL}/articles`, articleData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Dispatch setLoadingComplete to set loading to false
      dispatch(setLoadingComplete());

      return response.data;
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
    finally {
      // Dispatch setLoadingComplete to set loading to false, even if an error occurs
      dispatch(setLoadingComplete());
    }
  }

  async getAllArticles() {
    try {
      const response = await axios.get(`${BASE_URL}/articles`);
      return response.data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  }

  async getArticleById(articleId) {
    try {
      const response = await axios.get(`${BASE_URL}/articles/${articleId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching article by ID:', error);
      throw error;
    }
  }

  async getUserArticles(userId, token) {
    try {
      const response = await axios.get(`${BASE_URL}/articles/user-articles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user articles:', error);
      throw error;
    }
  }

  async updateArticle(articleId, updateArticleDto) {
    try {
      const response = await axios.patch(`${BASE_URL}/articles/${articleId}`, updateArticleDto);
      return response.data;
    } catch (error) {
      console.error('Error updating article:', error);
      throw error;
    }
  }

  async deleteArticle(articleId) {
    try {
      const response = await axios.delete(`${BASE_URL}/articles/${articleId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  }

  async deleteUserArticle(articleId, token) {
    try {
      const response = await axios.delete(`${BASE_URL}/articles/${articleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting user article:', error);
      throw error;
    }
  }

}

export default new PropertyService();
