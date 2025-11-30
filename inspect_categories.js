import https from 'https';

const options = {
    headers: {
        'Authorization': 'Bearer 022'
    }
};

https.get('https://ecommerce.fedegonzalez.com/categories/', options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Body:', data);
    });
}).on('error', (err) => {
    console.error('Error: ' + err.message);
});
