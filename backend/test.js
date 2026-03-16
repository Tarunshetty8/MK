const http = require('http');

const runTests = async () => {
    console.log('--- Starting API Verification ---');
    
    const request = (method, path, data = null, token = null) => {
        return new Promise((resolve, reject) => {
            const options = {
                hostname: 'localhost',
                port: 3001,
                path: path,
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            if (token) options.headers['Authorization'] = `Bearer ${token}`;

            const req = http.request(options, (res) => {
                let body = '';
                res.on('data', (chunk) => body += chunk);
                res.on('end', () => {
                    resolve({ statusCode: res.statusCode, body: body ? JSON.parse(body) : null });
                });
            });

            req.on('error', (e) => reject(e));
            if (data) req.write(JSON.stringify(data));
            req.end();
        });
    };

    try {
        // 1. Products endpoint
        let res = await request('GET', '/api/products');
        console.log(`[GET /api/products] Status: ${res.statusCode} (Expected 200)`);
        
        // 2. Register new user
        const testUser = { name: 'TestUser', email: `test${Date.now()}@example.com`, password: 'password123' };
        res = await request('POST', '/api/auth/register', testUser);
        console.log(`[POST /api/auth/register] Status: ${res.statusCode} (Expected 201)`);

        // 3. Login
        res = await request('POST', '/api/auth/login', { email: testUser.email, password: testUser.password });
        console.log(`[POST /api/auth/login] Status: ${res.statusCode} (Expected 200)`);
        const token = res.body.token;

        if (!token) throw new Error('No token returned from login');

        // 4. Create Order
        const testOrder = {
            customer_name: 'TestCustomer',
            email: testUser.email,
            items_summary: 'Sourdough (x1)',
            total_amount: 5.50,
            status: 'Pending',
            collection_time: '2026-10-10 12:00'
        };
        res = await request('POST', '/api/orders', testOrder, token);
        console.log(`[POST /api/orders] Status: ${res.statusCode} (Expected 201)`);
        const orderId = res.body.id;

        if (orderId) {
            // 5. Get specific order
            res = await request('GET', `/api/orders/${orderId}`);
            console.log(`[GET /api/orders/:id] Status: ${res.statusCode} (Expected 200)`);
        }

        console.log('--- API Verification Complete ---');
    } catch (err) {
        console.error('Test Failed:', err.message);
    }
};

runTests();
