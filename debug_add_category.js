import https from 'https';

const category = {
    title: "verduleria",
    description: "Verduras frescas"
};

const data = JSON.stringify(category);

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 022',
        'Content-Length': data.length
    }
};

const req = https.request('https://ecommerce.fedegonzalez.com/categories/', options, (res) => {
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
