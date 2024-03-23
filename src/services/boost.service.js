// boost.service.js
import axios from 'axios';


// const BASE_URL = "http://localhost:5001/user";
const BASE_URL = "https://dessa.ovh/user";

class BoostService {

    purchaseBoost(articleId, boostData, token) {
        return axios.post(`${BASE_URL}/article/${articleId}/boost`, boostData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}

export default new BoostService();
