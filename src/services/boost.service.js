// boost.service.js
import axios from 'axios';


// const BASE_URL = "http://localhost:5001/boost";
const BASE_URL = "https://dessa.ovh/boost";

class BoostService {

    createBoost(articleId, boostData, token) {
        
        return axios.post(`${BASE_URL}/article/${articleId}`, boostData, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
    }
}

export default new BoostService();
