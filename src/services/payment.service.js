// payment.service.js
import axios from 'axios';
import { purshasePlanSuccess, setLoading, setLoadingComplete } from '@/redux/slices/authSlice';

// const BASE_URL = "http://localhost:5001/payment";
const BASE_URL = "https://dessa.ovh/payment";

class paymentService {

    payWithGiftCard(userId, giftCardCode, dispatch) {

      dispatch(setLoading());

        return axios.post(`${BASE_URL}/use-gift-card`, {
          userId,
          giftCardCode
        }).then(response => {
          dispatch(setLoadingComplete());
          const updatedUser = response.data.user;
          dispatch(purshasePlanSuccess(updatedUser));
          return response.data;

        }).catch(error => {
          dispatch(setLoadingComplete());
          console.error('Error paying with gift card:', error.response ? error.response.data : error.message);
          throw error;
        });
      }
}

export default new paymentService();
