import https from 'https';

const TOKEN = '022';
const BASE_URL = 'https://ecommerce.fedegonzalez.com';

const categories = [
    "verduleria", "fruteria", "carniceria", "congelados",
    "electrodomesticos", "tecnologia", "bebidas", "galletas"
];

const productsData = {
    "verduleria": ["Papa", "Cebolla", "Zanahoria", "Lechuga", "Tomate", "Pimiento", "Calabaza", "Acelga", "Espinaca", "Batata", "Choclo", "Pepino", "Berenjena", "Zapallito", "Remolacha", "Brocoli", "Coliflor", "Repollo", "Ajo", "Perejil"],
    "fruteria": ["Manzana", "Banana", "Naranja", "Mandarina", "Pera", "Uva", "Durazno", "Ciruela", "Kiwi", "Melon", "Sandia", "Frutilla", "Arandanos", "Limon", "Pomelo", "Anana", "Mango", "Cereza", "Higo", "Palta"],
    "carniceria": ["Asado", "Vacio", "Matambre", "Lomo", "Bife de Chorizo", "Cuadril", "Nalga", "Bola de Lomo", "Peceto", "Carne Picada", "Pollo Entero", "Pechuga", "Muslo", "Alitas", "Cerdo Costeleta", "Cerdo Bondiola", "Cerdo Matambre", "Chorizo", "Morcilla", "Salchicha Parrillera"],
    "congelados": ["Papas Fritas", "Hamburguesas", "Nuggets", "Pizza", "Empanadas", "Vegetales Mix", "Helado", "Pescado Filet", "Rabas", "Mariscos", "Milanesas Soja", "Milanesas Pollo", "Espinaca Congelada", "Choclo Desgranado", "Arvejas", "Frutillas Congeladas", "Postre Helado", "Hielo", "Ravioles", "Sorrentinos"],
    "electrodomesticos": ["Licuadora", "Batidora", "Tostadora", "Pava Electrica", "Cafetera", "Microondas", "Horno Electrico", "Plancha", "Aspiradora", "Secador de Pelo", "Planchita", "Afeitadora", "Depiladora", "Ventilador", "Estufa", "Aire Acondicionado", "Lavarropas", "Heladera", "Freezer", "Lavavajillas"],
    "tecnologia": ["Celular Samsung", "Celular Motorola", "Celular iPhone", "Tablet", "Notebook", "Monitor", "Teclado", "Mouse", "Auriculares", "Parlante Bluetooth", "Smart Watch", "Cargador", "Cable USB", "Funda Celular", "Vidrio Templado", "Pendrive", "Disco Externo", "Router", "Impresora", "Cartucho"],
    "bebidas": ["Coca Cola", "Sprite", "Fanta", "Pepsi", "7Up", "Agua Mineral", "Agua con Gas", "Jugo Naranja", "Jugo Manzana", "Cerveza Quilmes", "Cerveza Brahma", "Cerveza Stella", "Vino Malbec", "Vino Cabernet", "Vino Blanco", "Fernet", "Gancia", "Campari", "Whisky", "Vodka"],
    "galletas": ["Oreo", "Chocolinas", "Rumba", "Amor", "Mellizas", "Criollitas", "Traviata", "Express", "Rex", "Kesitas", "Sonrisas", "Merengadas", "Opera", "Frutigran", "Granix", "Cerealitas", "Pepitos", "Toddy", "Bagley", "Terrabusi"]
};

function request(method, path, body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`,
            }
        };
        if (body) {
            options.headers['Content-Length'] = Buffer.byteLength(body);
        }

        const req = https.request(`${BASE_URL}${path}`, options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        resolve(data); // Handle non-JSON response if any
                    }
                } else {
                    reject(new Error(`Request failed with status ${res.statusCode}: ${data}`));
                }
            });
        });

        req.on('error', (e) => reject(e));
        if (body) req.write(body);
        req.end();
    });
}

async function seed() {
    try {
        console.log("Starting seed...");

        // 1. Get existing categories
        let existingCategories = [];
        try {
            existingCategories = await request('GET', '/categories/');
        } catch (e) {
            console.log("Could not fetch categories, assuming empty.");
        }

        const categoryMap = {};

        // 2. Create categories if needed
        for (const catName of categories) {
            let cat = existingCategories.find(c => c.title.toLowerCase() === catName.toLowerCase());
            if (!cat) {
                console.log(`Creating category: ${catName}`);
                try {
                    cat = await request('POST', '/categories/', JSON.stringify({ title: catName, description: `Productos de ${catName}` }));
                } catch (e) {
                    // Try with 'name' if title failed (just in case, though we confirmed title works)
                    console.error(`Failed to create category ${catName}:`, e.message);
                    continue;
                }
            } else {
                console.log(`Category exists: ${catName}`);
            }
            categoryMap[catName] = cat.id;
        }

        // 3. Create products
        for (const [catName, products] of Object.entries(productsData)) {
            const catId = categoryMap[catName];
            if (!catId) {
                console.log(`Skipping products for ${catName} (no category ID)`);
                continue;
            }

            console.log(`Creating products for ${catName}...`);
            for (const prodName of products) {
                const product = {
                    title: prodName,
                    price: Math.floor(Math.random() * 10000) + 1000,
                    description: `Descripción de ${prodName}`,
                    image: "https://placehold.co/600x400", // Legacy field just in case
                    pictures: ["https://placehold.co/600x400"],
                    category_id: catId,
                    tags: []
                };

                try {
                    await request('POST', '/products/', JSON.stringify(product));
                    // console.log(`Created ${prodName}`);
                } catch (e) {
                    console.error(`Failed to create ${prodName}:`, e.message);
                }
            }
        }

        console.log("Seed completed!");

    } catch (err) {
        console.error("Seed failed:", err);
    }
}

seed();
