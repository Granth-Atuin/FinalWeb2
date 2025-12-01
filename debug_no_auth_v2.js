import https from 'https';

const BASE_URL = 'https://ecommerce.fedegonzalez.com';

function request(path) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        };
        https.get(`${BASE_URL}${path}`, options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve({ status: res.statusCode, data: json });
                } catch (e) {
                    resolve({ status: res.statusCode, data: data });
                }
            });
        }).on('error', reject);
    });
}

async function check() {
    console.log("Fetching products WITHOUT auth (explicit)...");
    const res = await request('/products/');
    console.log(`Status: ${res.status}`);
    if (res.status === 200) {
        console.log(`Success! Got ${res.data.length} products.`);
    } else {
        console.log("Failed:", JSON.stringify(res.data).substring(0, 200));
    }
}

check();
