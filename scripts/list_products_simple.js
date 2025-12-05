import axios from 'axios';
import fs from 'fs';

const API_URL = "https://ecommerce.fedegonzalez.com";
const API_TOKEN = "689";

async function listProducts() {
    try {
        const response = await axios.get(`${API_URL}/products/?limit=100`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            }
        });
        const products = response.data;

        fs.writeFileSync('products.json', JSON.stringify(products.map(p => ({
            id: p.id,
            title: p.title,
            category: p.category ? p.category.title : 'Uncategorized'
        })), null, 2));

        console.log(`Saved ${products.length} products to products.json`);

    } catch (error) {
        console.error("Error fetching products:", error.message);
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        }
    }
}

listProducts();
