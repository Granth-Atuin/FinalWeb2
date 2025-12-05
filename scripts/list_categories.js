import axios from 'axios';

const API_URL = "https://ecommerce.fedegonzalez.com";

const API_TOKEN = "689";

async function listCategories() {
    try {
        const response = await axios.get(`${API_URL}/categories/`, {
            headers: { Authorization: `Bearer ${API_TOKEN}` }
        });
        const categories = response.data;
        console.log("Total categories:", categories.length);

        const seen = new Map();
        categories.forEach(c => {
            if (seen.has(c.title)) {
                console.log(`DUPLICATE TITLE: "${c.title}" - IDs: ${seen.get(c.title)} vs ${c.id}`);
            } else {
                seen.set(c.title, c.id);
            }
        });

        console.log(JSON.stringify(categories, null, 2));
    } catch (error) {
        console.error(error);
    }
}

listCategories();
