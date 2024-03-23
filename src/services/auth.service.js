// auth.service.js
import axios from 'axios';
import { signupSuccess, loginSuccess, verifyEmailSuccess } from "@/redux/slices/authSlice";
import { setLoading, setLoadingComplete } from '@/redux/slices/authSlice';

// const BASE_URL = "http://localhost:5001/user-auth";
const BASE_URL = "https://dessa.ovh/user-auth";

class AuthService {

  async signup(userData, dispatch) {
    try {

      dispatch(setLoading());
      const response = await axios.post(`${BASE_URL}/register`, userData);

      if (response.data && response.data.message === 'Registration successful') {
        const { token, user } = response.data;
        dispatch(signupSuccess({ token, user }));
        dispatch(setLoadingComplete());
        return response.data;

      } else {
        // console.error('Error during signup. Response:', response.data);
        throw new Error("Signup failed");
      }
    } catch (error) {

      // console.error("Error during signup");
      throw new Error("An error occurred during signup");

    }
    finally {
      dispatch(setLoadingComplete());
    }
  }

  async login(credentials, dispatch) {
    try {
      dispatch(setLoading());
      const response = await axios.post(`${BASE_URL}/login`, credentials);

      if (response.data && response.data.message === 'Authentication successful') {
        const { token, user } = response.data;
        dispatch(loginSuccess({ token, user }));
        dispatch(setLoadingComplete());
        return response.data;
      } else {
        // console.error('Error during login. Response:', response.data);
        throw new Error("Login failed");
      }
    } catch (error) {
      throw new Error("An error occurred during login");
    }
    finally {
      dispatch(setLoadingComplete());
    }
  }

  async verifyEmailCode(userId, confirmationCode, dispatch) {
    try {

      dispatch(setLoading());
      const response = await axios.post(`${BASE_URL}/verify-email-code/${userId}`, { confirmationCode });

      if (response.data && response.data.message === 'Email verification successful') {

        dispatch(verifyEmailSuccess());
        dispatch(setLoadingComplete());

        return response.data.user;
      } else {
        // console.error('Error during email verification. Response');
        throw new Error('Email verification failed');
      }
    } catch (error) {
      console.error('Error during email verification:', error);
      throw new Error('An error occurred during email verification');
    }
    finally {
      dispatch(setLoadingComplete());
    }

  }

  async requestPasswordReset(email, dispatch) {
    try {
      dispatch(setLoading());
      const response = await axios.post(`${BASE_URL}/forgot-password`, { email });

      if (response.data && response.data.message === 'Password reset email sent successfully') {

        dispatch(setLoadingComplete());
        return response.data;
      } else {
        // console.error('Error requesting password reset. Response:', response.data);
        throw new Error('Password reset request failed');
      }
    } catch (error) {
      // console.error('Error requesting password reset:', error);
      throw new Error('An error occurred while requesting password reset');
    }
    finally {
      dispatch(setLoadingComplete());
    }
  }

  async resetPassword(resetToken, newPassword, dispatch) {
    try {
      dispatch(setLoading());
      const response = await axios.patch(`${BASE_URL}/reset-password/${resetToken}`, { newPassword });

      if (response.data && response.data.message === 'Password reset successful') {

        dispatch(setLoadingComplete());
        return response.data;
      } else {
        throw new Error(response.data.message || 'Password reset failed');
      }
    } catch (error) {
      throw new Error('An error occurred while resetting password');
    }
    finally {
      dispatch(setLoadingComplete());
    }
  }

  async resendEmailVerification(userId, dispatch) {
    try {
      dispatch(setLoading());
      const response = await axios.post(`${BASE_URL}/resend-email-verification`, { userId });

      if (response.data && response.data.message === 'Email verification code resent successfully') {
        console.log('Successful email verification resend response:', response.data);
        // You might want to update the Redux state or perform other actions
        // dispatch(updateUser(response.data.user));
        dispatch(setLoadingComplete());
        return response.data;
      } else {
        throw new Error('Email verification code resend failed');
      }
    } catch (error) {
      console.error('Error resending email verification code:', error);
      throw new Error('An error occurred while resending email verification code');
    }
    finally {
      dispatch(setLoadingComplete());
    }
  }

  async checkEmailExistence(email) {
    try {

      const response = await axios.post(`${BASE_URL}/check-email-existence`, { email });

      if (response.data && response.data.exists) {
        return true; // Email exists
      } else {
        return false; // Email does not exist
      }
    } catch (error) {
      throw new Error('An error occurred while checking email existence');
    }
  }


  async updateUser(userId, updateData, currentPassword, profileImage, token, dispatch) {
    dispatch(setLoading());
  
    const formData = new FormData();
    // Append each updateData field to the formData
    Object.keys(updateData).forEach(key => {
      formData.append(`updateData[${key}]`, updateData[key]);
    });
  
    // Append currentPassword separately, not inside updateData
    formData.append('currentPassword', currentPassword);
  
    // Append profileImage if present
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
  
    try {
      const response = await axios.patch(`${BASE_URL}/update-user/${userId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data' is not needed; Axios sets it automatically when formData is passed
        },
      });
  
      dispatch(setLoadingComplete());
  
      if (response.data && response.data.message === 'User updated successfully') {
        return response.data;
      } else {
        throw new Error('User update failed');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      dispatch(setLoadingComplete());
      throw new Error('An error occurred while updating user information');
    }
  }
  

  async changePassword(userId, oldPassword, newPassword, dispatch) {
    try {
      dispatch(setLoading());
      const response = await axios.patch(`${BASE_URL}/change-password/${userId}`, { oldPassword, newPassword });
  
      if (response.data && response.data.message === 'Password changed successfully') {
        dispatch(setLoadingComplete());
        return response.data;
      } else {
        throw new Error(response.data.message || 'Password change failed');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      dispatch(setLoadingComplete());
      throw new Error('An error occurred while changing password');
    }
  }
  

}

export default new AuthService();
