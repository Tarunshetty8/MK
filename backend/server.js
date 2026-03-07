const express = require('express');
const cors = require('cors');
const pool = require('./db');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

// --- Products Endpoints ---
app.get('/api/products', (req, res) => {
    pool.query("SELECT * FROM Products", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        const mapped = result.map(r => ({
            id: r.id, name: r.name, description: r.description,
            price: r.price, stock: r.stock_quantity, category: r.category,
            status: r.is_active ? 'Active' : 'Inactive', images: r.images ? JSON.parse(r.images) : []
        }));
        res.json(mapped);
    });
});
app.post('/api/products', (req, res) => {
    const { name, description, price, stock, category, status } = req.body;
    const id = Date.now().toString();
    const is_active = status === 'Active' ? 1 : 0;
    pool.query(
        `INSERT INTO Products (id, name, description, price, stock_quantity, category, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, name, description, price, stock || 0, category, is_active],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id, name, price, stock, category, status });
        }
    );
});
app.put('/api/products/:id', (req, res) => {
    const { name, description, price, stock, category, status } = req.body;
    const is_active = status === 'Active' ? 1 : 0;
    pool.query(
        `UPDATE Products SET name = ?, description = ?, price = ?, stock_quantity = ?, category = ?, is_active = ? WHERE id = ?`,
        [name, description, price, stock, category, is_active, req.params.id],
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

// --- Orders Endpoints ---
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
app.post('/api/orders', (req, res) => {
    const { total_amount, collection_time, customer_name, items } = req.body;
    const id = `ORD-${Math.floor(Math.random() * 10000)}`;
    pool.query(`INSERT INTO Orders (id, total_amount, status, collection_time, customer_name, items_summary, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [id, total_amount, 'Pending', collection_time, customer_name || 'Guest', items || 'Unknown'],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id, message: "Order placed successfully" });
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

// --- Enquiries Endpoints ---
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
app.post('/api/enquiries', (req, res) => {
    const { type, name, event_date, guests, details } = req.body;
    const id = `ENQ-${Math.floor(Math.random() * 10000)}`;
    pool.query(`INSERT INTO Enquiries (id, type, customer_name, event_date, guests, status, received, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, type, name, event_date, guests, 'Pending', 'Just now', details],
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

// --- Customers / Users Endpoints ---
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

// --- Events Endpoints ---
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

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
