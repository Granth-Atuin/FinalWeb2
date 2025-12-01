import https from 'https';

const BASE_URL = 'https://ecommerce.fedegonzalez.com';

function request(path, useAuth = true) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: useAuth ? { 'Authorization': 'Bearer 022' } : {}
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
    console.log("Fetching products WITH auth...");
    const resAuth = await request('/products/', true);
    console.log(`Status: ${resAuth.status}`);
    console.log("Response:", JSON.stringify(resAuth.data).substring(0, 200));

    console.log("\nFetching products WITHOUT auth...");
    const resNoAuth = await request('/products/', false);
    console.log(`Status: ${resNoAuth.status}`);
    console.log("Response:", JSON.stringify(resNoAuth.data).substring(0, 200));
}

check();
