// user.service.js
import axios from 'axios';

const BASE_URL = "http://localhost:5001/user";

class PropertyService {
  async createArticle(createArticleDto, imageFiles) {
    try {
      const formData = new FormData();
      formData.append('title', createArticleDto.title);
      formData.append('content', createArticleDto.content);

      // Append image files to the form data
      for (const file of imageFiles) {
        formData.append('images', file);
      }

      const response = await axios.post(`${BASE_URL}/articles`, formData, {
        headers: {
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
      const formData = new FormData();

      // Append image files to the form data
      for (const file of imageFiles) {
        formData.append('images', file);
      }

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
