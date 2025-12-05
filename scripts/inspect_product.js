import axios from 'axios';

const API_URL = "https://ecommerce.fedegonzalez.com";

const API_TOKEN = "689";

async function getProduct() {
    try {
        const response = await axios.get(`${API_URL}/products/1284`, {
            headers: { Authorization: `Bearer ${API_TOKEN}` }
        });
        console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error(error);
    }
}

getProduct();
