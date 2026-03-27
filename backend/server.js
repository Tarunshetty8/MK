const express = require('express');
const cors = require('cors');
const pool = require('./db');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'marmelo-super-secret-key';

const app = express();
app.use(cors());
app.use(express.json());

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};


app.use(express.static(path.join(__dirname, '../dist')));


app.get('/api/products', (req, res) => {
    pool.query("SELECT * FROM Products", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        const mapped = result.map(r => ({
            id: r.id, name: r.name, description: r.description,
            price: r.price, flash_sale_price: r.flash_sale_price, is_flash_sale: r.is_flash_sale, stock: r.stock_quantity, category: r.category,
            status: r.is_active ? 'Active' : 'Inactive', images: r.images ? JSON.parse(r.images) : [], expiry_date: r.expiry_date
        }));
        res.json(mapped);
    });
});

app.get('/api/products/:id', (req, res) => {
    pool.query("SELECT * FROM Products WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ error: 'Product not found' });
        const r = result[0];
        const mapped = {
            id: r.id, name: r.name, description: r.description,
            price: r.price, flash_sale_price: r.flash_sale_price, is_flash_sale: r.is_flash_sale, stock: r.stock_quantity, category: r.category,
            status: r.is_active ? 'Active' : 'Inactive', images: r.images ? JSON.parse(r.images) : [], expiry_date: r.expiry_date
        };
        res.json(mapped);
    });
});
app.post('/api/products', (req, res) => {
    const { name, description, price, flash_sale_price, is_flash_sale, stock, category, status, expiry_date } = req.body;
    const id = Date.now().toString();
    const is_active = status === 'Active' ? 1 : 0;
    pool.query(
        `INSERT INTO Products (id, name, description, price, flash_sale_price, is_flash_sale, stock_quantity, category, is_active, expiry_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, name, description, price, flash_sale_price || null, is_flash_sale ? 1 : 0, stock || 0, category, is_active, expiry_date || null],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id, name, price, flash_sale_price, is_flash_sale, stock, category, status, expiry_date });
        }
    );
});
app.put('/api/products/:id', (req, res) => {
    const { name, description, price, flash_sale_price, is_flash_sale, stock, category, status, expiry_date } = req.body;
    const is_active = status === 'Active' ? 1 : 0;
    pool.query(
        `UPDATE Products SET name = ?, description = ?, price = ?, flash_sale_price = ?, is_flash_sale = ?, stock_quantity = ?, category = ?, is_active = ?, expiry_date = ? WHERE id = ?`,
        [name, description, price, flash_sale_price || null, is_flash_sale ? 1 : 0, stock, category, is_active, expiry_date || null, req.params.id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Product updated", id: req.params.id });
        }
    );
});
app.delete('/api/products/:id', (req, res) => {
    pool.query(`DELETE FROM Products WHERE id = ?`, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Product deleted" });
    });
});


app.get('/api/orders', (req, res) => {
    pool.query("SELECT * FROM Orders ORDER BY created_at DESC", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        const mapped = result.map(r => ({
            id: r.id, date: r.created_at, customer: r.customer_name || 'Guest User',
            amount: r.total_amount, items: r.items_summary || 'Unknown items', status: r.status, collection: r.collection_time || 'N/A'
        }));
        res.json(mapped);
    });
});

app.get('/api/orders/:id', (req, res) => {
    pool.query("SELECT * FROM Orders WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ error: 'Order not found' });
        const r = result[0];
        const mapped = {
            id: r.id, date: r.created_at, customer: r.customer_name || 'Guest User',
            amount: r.total_amount, items: r.items_summary || 'Unknown items', status: r.status, collection: r.collection_time || 'N/A'
        };
        res.json(mapped);
    });
});
app.post('/api/orders', (req, res) => {
    const { total_amount, collection_time, customer_name, items, raw_items } = req.body;
    const id = `ORD-${Math.floor(Math.random() * 10000)}`;
    
    let userId = null;
    if (req.headers['authorization']) {
        const token = req.headers['authorization'].split(' ')[1];
        try {
            const user = jwt.verify(token, JWT_SECRET);
            userId = user.id;
        } catch(e) {}
    }

    pool.query(`INSERT INTO Orders (id, user_id, total_amount, status, collection_time, customer_name, items_summary, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
        [id, userId, total_amount, 'Pending', collection_time, customer_name || 'Guest', items || 'Unknown'],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            
            if (raw_items && Array.isArray(raw_items) && raw_items.length > 0) {
                const values = raw_items.map(item => [uuidv4(), id, item.id, item.quantity, item.price]);
                pool.query(`INSERT INTO Order_Items (id, order_id, product_id, quantity, price_at_purchase) VALUES ?`, [values], (err2) => {
                    if (err2) console.error("Error inserting order items:", err2);
                    res.status(201).json({ id, message: "Order placed successfully" });
                });
            } else {
                res.status(201).json({ id, message: "Order placed successfully" });
            }
        }
    );
});
app.patch('/api/orders/:id/status', (req, res) => {
    const { status } = req.body;
    pool.query(`UPDATE Orders SET status = ? WHERE id = ?`, [status, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Order status updated" });
    });
});


app.get('/api/enquiries', (req, res) => {
    pool.query("SELECT * FROM Enquiries ORDER BY created_at DESC", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        const mapped = result.map(r => ({
            id: r.id, type: r.type, name: r.customer_name, date: r.event_date,
            guests: r.guests, status: r.status, received: r.received, details: r.details
        }));
        res.json(mapped);
    });
});

app.get('/api/user/enquiries', authenticateToken, (req, res) => {
    pool.query("SELECT * FROM Enquiries WHERE user_id = ? ORDER BY created_at DESC", [req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        const mapped = result.map(r => ({
            id: r.id, type: r.type, name: r.customer_name, date: r.event_date,
            guests: r.guests, status: r.status, received: r.received, details: r.details
        }));
        res.json(mapped);
    });
});

app.post('/api/enquiries', (req, res) => {
    const { type, name, event_date, guests, details } = req.body;
    const id = `ENQ-${Math.floor(Math.random() * 10000)}`;

    let userId = null;
    if (req.headers['authorization']) {
        const token = req.headers['authorization'].split(' ')[1];
        try {
            const user = jwt.verify(token, JWT_SECRET);
            userId = user.id;
        } catch(e) {}
    }

    pool.query(`INSERT INTO Enquiries (id, user_id, customer_name, type, event_date, guests, status, received, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, userId, name, type, event_date, guests, 'Pending', 'Just now', details],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id, message: "Enquiry submitted" });
        }
    );
});
app.patch('/api/enquiries/:id/status', (req, res) => {
    const { status } = req.body;
    pool.query(`UPDATE Enquiries SET status = ? WHERE id = ?`, [status, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Enquiry status updated" });
    });
});


app.get('/api/customers', (req, res) => {
    pool.query("SELECT * FROM Users", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        const mapped = result.map(r => ({
            id: r.id, name: r.name, email: r.email, phone: r.phone,
            orders: r.orders_count, spent: r.spent, status: r.status
        }));
        res.json(mapped);
    });
});

app.post('/api/auth/register', async (req, res) => {
    const { email, password, name, phone } = req.body;
    const id = `CUST-${Math.floor(Math.random() * 10000)}`;

    pool.query("SELECT * FROM Users WHERE email = ?", [email], async (err, existsResult) => {
        if (err) return res.status(500).json({ error: err.message });
        if (existsResult.length > 0) {
            return res.status(400).json({ error: "Email already registered." });
        }

        const password_hash = await bcrypt.hash(password, 10);

        pool.query(
            `INSERT INTO Users (id, email, password_hash, name, phone, orders_count, spent, status, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, email, password_hash, name, phone || '', 0, 0, 'Active', 'customer'],
            (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                const token = jwt.sign({ id, email, role: 'customer' }, JWT_SECRET, { expiresIn: '24h' });
                res.status(201).json({ id, email, name, role: 'customer', token, message: "User registered successfully" });
            }
        );
    });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    pool.query("SELECT * FROM Users WHERE email = ?", [email], async (err, existsResult) => {
        if (err) return res.status(500).json({ error: err.message });
        if (existsResult.length === 0) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        const user = existsResult[0];

        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

        res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            token,
            message: "Login successful"
        });
    });
});

app.post('/api/auth/logout', (req, res) => {
    // With stateless JWT, we mostly handle logout on the client side by dropping the token.
    res.status(200).json({ message: "Logged out successfully" });
});

app.post('/api/auth/reset-password', (req, res) => {
    const { email } = req.body;
    // Mocking email send for password reset
    res.status(200).json({ message: `Password reset email sent to ${email}` });
});

app.get('/api/profile', authenticateToken, (req, res) => {
    pool.query("SELECT id, email, name, phone, orders_count, spent, role FROM Users WHERE id = ?", [req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ error: "User not found" });
        res.json(result[0]);
    });
});

app.put('/api/profile', authenticateToken, (req, res) => {
    const { name, phone } = req.body;
    pool.query("UPDATE Users SET name = ?, phone = ? WHERE id = ?", [name, phone, req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Profile updated successfully" });
    });
});


app.get('/api/events', (req, res) => {
    pool.query("SELECT * FROM Events ORDER BY maxAttendees DESC", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});
app.post('/api/events', (req, res) => {
    const { title, date, location, attendees, maxAttendees, status } = req.body;
    const id = Date.now().toString();
    pool.query(`INSERT INTO Events (id, title, date, location, attendees, maxAttendees, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, title, date, location, attendees || 0, maxAttendees, status || 'Upcoming'],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id, message: "Event created" });
        }
    );
});
app.put('/api/events/:id', (req, res) => {
    const { title, date, location, attendees, maxAttendees, status } = req.body;
    pool.query(`UPDATE Events SET title = ?, date = ?, location = ?, attendees = ?, maxAttendees = ?, status = ? WHERE id = ?`,
        [title, date, location, attendees, maxAttendees, status, req.params.id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Event updated" });
        }
    );
});
app.delete('/api/events/:id', (req, res) => {
    pool.query(`DELETE FROM Events WHERE id = ?`, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Event deleted" });
    });
});

// Notifications
app.post('/api/notifications/register', (req, res) => {
    const { token } = req.body;
    // Mocking storing FMC tokens
    res.status(200).json({ message: "Device registered for notifications" });
});

app.post('/api/notifications/send', (req, res) => {
    const { title, body, user_id } = req.body;
    // Mocking sending push notification
    res.status(200).json({ message: "Push notification simulated successfully" });
});

app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
