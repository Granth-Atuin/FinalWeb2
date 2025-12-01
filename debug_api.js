import https from 'https';

const BASE_URL = 'https://ecommerce.fedegonzalez.com';

function request(path) {
    return new Promise((resolve, reject) => {
        https.get(`${BASE_URL}${path}`, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    console.log("Raw response:", data);
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function check() {
    console.log("Fetching products...");
    const response = await request('/products/');
    console.log("Response type:", typeof response);
    console.log("Is array?", Array.isArray(response));

    let products = [];
    if (Array.isArray(response)) {
        products = response;
    } else if (response.products && Array.isArray(response.products)) {
        products = response.products;
    } else if (response.data && Array.isArray(response.data)) {
        products = response.data;
    } else {
        console.log("Unknown response structure:", Object.keys(response));
        return;
    }

    console.log(`Total products returned: ${products.length}`);

    const categories = await request('/categories/');
    console.log(`Total categories: ${categories.length}`);

    const categoryCounts = {};
    products.forEach(p => {
        const cat = categories.find(c => c.id === p.category_id);
        const catName = cat ? cat.title : `Unknown (${p.category_id})`;
        categoryCounts[catName] = (categoryCounts[catName] || 0) + 1;
    });

    console.log("Products per category:");
    console.table(categoryCounts);
}

check();
