// auth.service.js
import axios from 'axios';
import { signupSuccess, loginSuccess } from "@/redux/slices/authSlice";
const BASE_URL = "http://localhost:5001/user-auth";

class AuthService {

  async signup(userData, dispatch) {
    try {
      const response = await axios.post(`${BASE_URL}/register`, userData);

      if (response.data && response.data.message === 'Registration successful') {
        // Registration was successful
        console.log('Successful registration response:', response.data);

        // Dispatch the signup success action
        const { token, user } = response;
        dispatch(signupSuccess({ token, user }));
        console.log('Signup API Response:', response);

        return response.data;
      } else {
        // Server responded with an error
        console.error('Error during signup. Response:', response.data);
        throw new Error(response.data.message || "Signup failed");
      }
    } catch (error) {
      // Log detailed error information
      console.error("Error during signup:", error);

      // Rethrow the error to maintain the original behavior
      throw new Error("An error occurred during signup");
    }
  }


  async login(credentials, dispatch) {
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials);

      if (response.data && response.data.message === 'Authentication successful') {
        console.log('Successful login response:', response.data);

        const { token, user } = response;
        dispatch(loginSuccess({ token, user }));
        console.log('login API Response:', response);
        
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

}


export default new AuthService();
