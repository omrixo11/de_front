// user.service.js
import axios from 'axios';

const BASE_URL = "http://localhost:5001";

class PropertyService {

  async createArticle(formData, token, userId) {
    try {
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
  
      return response.data;
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  }
  

  async uploadImages(articleId, imageFiles) {
    try {
      // Use FormData to handle file uploads
      const formData = new FormData();
      imageFiles.forEach((file) => {
        formData.append('images', file.buffer, { filename: file.originalname });
      });

      // Call the backend endpoint to upload images for a specific article
      const response = await axios.post(`${BASE_URL}/articles/${articleId}/upload-images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
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
}

export default new PropertyService();
