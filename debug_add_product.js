import https from 'https';

const product = {
    title: "Test Product with Category ID",
    price: 100,
    description: "Test Description",
    image: "https://placehold.co/600x400",
    category: 210
};

const data = JSON.stringify(product);

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 022',
        'Content-Length': data.length
    }
};

const req = https.request('https://ecommerce.fedegonzalez.com/products/', options, (res) => {
    let body = '';
    res.on('data', (chunk) => {
        body += chunk;
    });
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Body:', body);
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(data);
req.end();
