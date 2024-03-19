// user.service.js
import axios from 'axios';

import { setLoading, setLoadingComplete } from '@/redux/slices/authSlice';

const BASE_URL = "http://localhost:5001";
// const BASE_URL = "https://dessa.ovh";

class PropertyService {

  async createArticle(formData, token, userId, dispatch) {
    try {
      // Dispatch setLoading to set loading to true
      console.log("token from service add:", token);
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
      console.error('Error creating');

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
      console.error('Error fetching articles');
      throw error;
    }
  }

  async getArticleById(articleId) {
    try {
      const response = await axios.get(`${BASE_URL}/articles/${articleId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching article');

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
      console.error('Error fetching user articles');

    }
  }

  async getUserArticlesById(userId) {
    try {
      const response = await axios.get(`${BASE_URL}/articles/${userId}/articles`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user articles');
      throw error; 
    }
  }

  async updateArticle(articleId, updateArticleDto) {
    try {
      const response = await axios.patch(`${BASE_URL}/articles/${articleId}`, updateArticleDto);
      return response.data;
    } catch (error) {
      console.error('Error updating article');
    }
  }

  async deleteUserArticle(articleId, token, dispatch) {
    try {
      console.log("articleId:", articleId);
      dispatch(setLoading())
      const response = await axios.delete(`${BASE_URL}/articles/${articleId}/user-article`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setLoadingComplete())
      return response.data;
    } catch (error) {
      console.error('Error deleting user article:', error);
      throw error;
    }
    finally {
      dispatch(setLoadingComplete())
    }
  }

  async searchArticles(query, dispatch) {
    try {
      dispatch(setLoading());
      let response;
      if (query.trim() === '') {
        // Fetch all articles if query is empty
        response = await axios.get(`${BASE_URL}/articles`);
      } else {
        // Perform search with the query
        response = await axios.get(`${BASE_URL}/articles/search`, {
          params: {
            query,
          },
        });
      }
      dispatch(setLoadingComplete());
      return response.data;
    } catch (error) {
      console.error('Error searching articles:', error);
      throw error;
    } finally {
      dispatch(setLoadingComplete());
    }
  }


  async getArticlesByVille(ville) {
    try {
      const response = await axios.get(`${BASE_URL}/articles/by-ville/${ville}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching articles by ville:', error);
      throw error;
    }
  }

  async getArticlesByQuartier(quartier) {
    try {
      const response = await axios.get(`${BASE_URL}/articles/by-quartier/${quartier}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching articles by quartier:', error);
      throw error;
    }
  }

  async incrementArticleViews(articleId) {
    try {
      const response = await axios.patch(`${BASE_URL}/articles/${articleId}/increment-views`);
      return response.data;
    } catch (error) {
      console.error('Error incrementing article views:', error);
      throw error;
    }
  }

  async getTotalViewsCountForUser(userId, token) {
    try {
      const response = await axios.get(`${BASE_URL}/articles/user/${userId}/total-views`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching total views count for user:', error.response ? error.response.data : error);
      throw error;
    }

  }

  async countUserArticles(userId, token) {
    try {
      const response = await axios.get(`${BASE_URL}/articles/user/${userId}/article-count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("this is use count", response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user article count:', error);
      throw error;
    }
  }

  async countUserFavoriteArticles(userId, token) {
    try {
      const response = await axios.get(`${BASE_URL}/articles/user/${userId}/favorite-article-count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user favorite article count:', error);
      throw error;
    }
  }

  async getSimilarArticles(articleId) {
    try {
      const response = await axios.get(`${BASE_URL}/articles/${articleId}/similar`);
      return response.data;
    } catch (error) {
      console.error('Error fetching similar articles:', error);
      throw error;
    }
  }

  async getTotalViewsByVilleForUser(userId, token) {
    try {
      const response = await axios.get(`${BASE_URL}/articles/user/${userId}/views-by-ville`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching total views by ville for user:', error);
      throw error;
    }
  }

  async getTotalViewsByQuartierForUser(userId, token) {
    try {
      const response = await axios.get(`${BASE_URL}/articles/user/${userId}/views-by-quartier`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching total views by quartier for user:', error);
      throw error;
    }
  }

  
  

}

export default new PropertyService();
