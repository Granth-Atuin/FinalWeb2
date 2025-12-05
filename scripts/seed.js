import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../src/data/mockData.js';
import { API_URL, API_TOKEN } from '../src/utils/constants.js';

async function seed() {
    console.log('Starting database seed...');
    console.log(`Target API: ${API_URL}`);

    const categoryMapping = {};

    // 1. Create Categories
    console.log('\nCreating Categories...');
    for (const cat of MOCK_CATEGORIES) {
        try {
            const res = await fetch(`${API_URL}/categories/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_TOKEN}`
                },
                body: JSON.stringify({
                    title: cat.title,
                    description: cat.description
                })
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Failed to create category ${cat.title}: ${res.status} ${text}`);
            }

            const newCat = await res.json();
            console.log(`✅ Created category: ${newCat.title} (ID: ${newCat.id})`);
            categoryMapping[cat.id] = newCat.id;
        } catch (error) {
            console.error(`❌ Error creating category ${cat.title}:`, error.message);
        }
    }

    // 2. Create Products
    console.log('\nCreating Products...');
    for (const prod of MOCK_PRODUCTS) {
        const newCategoryId = categoryMapping[prod.category_id];

        if (!newCategoryId) {
            console.warn(`⚠️ Skipping product ${prod.title}: Category ID ${prod.category_id} not found in mapping.`);
            continue;
        }

        try {
            // Construct payload exactly like ProductForm.jsx
            const payload = {
                title: prod.title,
                price: Number(prod.price),
                description: prod.description || prod.title, // Ensure description exists
                category_id: Number(newCategoryId),
                pictures: [prod.image], // Use 'pictures' array with the single image URL
                tags: prod.discount > 0 ? ["destacados"] : [], // Simple logic for tags
                discount: Number(prod.discount || 0),
            };

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
                throw new Error(`Failed to create product ${prod.title}: ${res.status} ${text}`);
            }

            const newProd = await res.json();
            console.log(`✅ Created product: ${newProd.title} (ID: ${newProd.id})`);
        } catch (error) {
            console.error(`❌ Error creating product ${prod.title}:`, error.message);
        }
    }

    console.log('\nSeed completed!');
}

seed().catch(console.error);
