import https from 'https';

const options = {
    headers: {
        'Authorization': 'Bearer 022'
    }
};

https.get('https://ecommerce.fedegonzalez.com/products/', options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        try {
            if (res.statusCode >= 300 && res.statusCode < 400) {
                console.log('Redirect to:', res.headers.location);
                return;
            }
            const products = JSON.parse(data);
            console.log(JSON.stringify(products.slice(0, 2), null, 2));
        } catch (e) {
            console.log('Status:', res.statusCode);
            console.log('Body:', data.substring(0, 200));
            console.error(e.message);
        }
    });
}).on('error', (err) => {
    console.error('Error: ' + err.message);
});
