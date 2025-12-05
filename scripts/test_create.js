import { API_URL, API_TOKEN } from '../src/utils/constants.js';

async function testCreate() {
    console.log('Testing product creation...');

    try {
        // 1. Get a valid category
        const catRes = await fetch(`${API_URL}/categories/`, {
            headers: { 'Authorization': `Bearer ${API_TOKEN}` }
        });
        const categories = await catRes.json();

        if (categories.length === 0) {
            console.error("❌ No categories found to test with.");
            return;
        }

        const validCategoryId = categories[0].id;
        console.log(`Using Category ID: ${validCategoryId} (${categories[0].title})`);

        const payload = {
            title: "Test Product " + Date.now(),
            price: 1000,
            description: "Test description",
            category_id: validCategoryId,
            pictures: ["https://placehold.co/600x400"],
            tags: ["destacado", "descuento"],
            discount: 10
        };

        console.log("Payload:", JSON.stringify(payload, null, 2));

        const res = await fetch(`${API_URL}/products/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const text = await res.text();
            console.error(`❌ Failed: ${res.status}`);
            console.error(`Response: ${text}`);
        } else {
            const data = await res.json();
            console.log("✅ Success!", data);
        }
    } catch (err) {
        console.error("❌ Network Error:", err);
    }
}

testCreate();
