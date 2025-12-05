import fs from 'fs';
import path from 'path';
import axios from 'axios';
import FormData from 'form-data';

const API_URL = "https://ecommerce.fedegonzalez.com";
const API_TOKEN = "689";

const productId = process.argv[2];
const filePath = process.argv[3];

if (!productId || !filePath) {
    console.error("Usage: node scripts/upload_image.js <productId> <filePath>");
    process.exit(1);
}

async function uploadImage() {
    try {
        const absolutePath = path.resolve(filePath);
        if (!fs.existsSync(absolutePath)) {
            throw new Error(`File not found: ${absolutePath}`);
        }

        const form = new FormData();
        // API expects 'files' (plural) based on productService.js: formData.append("files", file)
        form.append('files', fs.createReadStream(absolutePath));

        console.log(`Uploading ${absolutePath} to product ${productId}...`);

        const response = await axios.post(`${API_URL}/products/${productId}/pictures`, form, {
            headers: {
                ...form.getHeaders(),
                'Authorization': `Bearer ${API_TOKEN}`,
                'accept': 'application/json'
            }
        });

        console.log("Upload successful:", response.data);

    } catch (error) {
        console.error("Upload failed:", error.response ? error.response.data : error.message);
        process.exit(1);
    }
}

uploadImage();
