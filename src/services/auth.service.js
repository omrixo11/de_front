// auth.service.js
import axios from 'axios';
import { signupSuccess, loginSuccess, verifyEmailSuccess } from "@/redux/slices/authSlice";
const BASE_URL = "http://localhost:5001/user-auth";

class AuthService {

  async signup(userData, dispatch) {
    try {
      const response = await axios.post(`${BASE_URL}/register`, userData);

      if (response.data && response.data.message === 'Registration successful') {
        const { token, user } = response.data;
        dispatch(signupSuccess({ token, user }));
        return response.data;
      } else {
        console.error('Error during signup. Response:', response.data);
        throw new Error(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      throw new Error("An error occurred during signup");
    }
  }

  async login(credentials, dispatch) {
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials);

      if (response.data && response.data.message === 'Authentication successful') {
        const { token, user } = response.data;
        dispatch(loginSuccess({ token, user }));
        return response.data;
      } else {
        console.error('Error during login. Response:', response.data);
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("An error occurred during login");
    }
  }

  async verifyEmailCode(userId, confirmationCode, dispatch) {
    try {
      const response = await axios.post(`${BASE_URL}/verify-email-code/${userId}`, { confirmationCode });
      
      if (response.data && response.data.message === 'Email verification successful') {
        console.log('Successful email verification response:', response.data);
        
        // Dispatch the verifyEmailSuccess action to update Redux state
        dispatch(verifyEmailSuccess());

        return response.data.user; 
      } else {
        console.error('Error during email verification. Response:', response.data);
        throw new Error(response.data.message || 'Email verification failed');
      }
    } catch (error) {
      console.error('Error during email verification:', error);
      throw new Error('An error occurred during email verification');
    }
  }

  async requestPasswordReset(email) {
    try {
      const response = await axios.post(`${BASE_URL}/forgot-password`, { email });

      if (response.data && response.data.message === 'Password reset email sent successfully') {
        console.log('Password reset email sent successfully:', response.data);
        return response.data;
      } else {
        console.error('Error requesting password reset. Response:', response.data);
        throw new Error(response.data.message || 'Password reset request failed');
      }
    } catch (error) {
      console.error('Error requesting password reset:', error);
      throw new Error('An error occurred while requesting password reset');
    }
  }

  async resetPassword(resetToken, newPassword) {
    try {
      const response = await axios.patch(`${BASE_URL}/reset-password/${resetToken}`, { newPassword });

      if (response.data && response.data.message === 'Password reset successful') {
        console.log('Password reset successful:', response.data);
        return response.data;
      } else {
        console.error('Error resetting password. Response:', response.data);
        throw new Error(response.data.message || 'Password reset failed');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      throw new Error('An error occurred while resetting password');
    }
  }

  async resendEmailVerification(userId, dispatch) {
    try {
      const response = await axios.post(`${BASE_URL}/resend-email-verification`, { userId });

      if (response.data && response.data.message === 'Email verification code resent successfully') {
        console.log('Successful email verification resend response:', response.data);
        // You might want to update the Redux state or perform other actions
        // dispatch(updateUser(response.data.user));
        return response.data;
      } else {
        console.error('Error resending email verification code. Response:', response.data);
        throw new Error(response.data.message || 'Email verification code resend failed');
      }
    } catch (error) {
      console.error('Error resending email verification code:', error);
      throw new Error('An error occurred while resending email verification code');
    }
  }

}

export default new AuthService();
