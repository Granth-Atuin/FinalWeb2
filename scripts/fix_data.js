import { MOCK_PRODUCTS } from '../src/data/mockData.js';
import { API_URL, API_TOKEN } from '../src/utils/constants.js';

async function fixData() {
    console.log('Starting data fix...');

    // 1. Fetch all existing products
    console.log('Fetching existing products...');
    let products = [];
    try {
        const res = await fetch(`${API_URL}/products/`, {
            headers: { 'Authorization': `Bearer ${API_TOKEN}` }
        });
        if (!res.ok) throw new Error(await res.text());
        products = await res.json();
        console.log(`Found ${products.length} products in DB.`);
    } catch (err) {
        console.error("Error fetching products:", err);
        return;
    }

    // 2. Update products that match mock data
    let updatedCount = 0;
    for (const prod of products) {
        const mockMatch = MOCK_PRODUCTS.find(m => m.title === prod.title);

        // If we found a match and the mock has a discount, we update the DB product
        if (mockMatch && mockMatch.discount > 0) {
            console.log(`Updating ${prod.title} (ID: ${prod.id}) with discount ${mockMatch.discount}%...`);

            try {
                const tags = ["destacado", "descuento"]; // Add tags

                const payload = {
                    title: prod.title,
                    price: Number(prod.price),
                    description: prod.description,
                    category_id: Number(prod.category_id),
                    pictures: prod.pictures || [prod.image],
                    tags: tags,
                    discount: Number(mockMatch.discount)
                };

                const res = await fetch(`${API_URL}/products/${prod.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_TOKEN}`
                    },
                    body: JSON.stringify(payload)
                });

                if (!res.ok) {
                    console.error(`Failed to update ${prod.title}:`, await res.text());
                } else {
                    console.log(`✅ Updated ${prod.title}`);
                    updatedCount++;
                }
            } catch (err) {
                console.error(`Error updating ${prod.title}:`, err);
            }
        }
    }

    console.log(`\nFix completed! Updated ${updatedCount} products.`);
}

fixData().catch(console.error);
