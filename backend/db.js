require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'marmelo',
    port: process.env.MYSQL_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error acquiring connection', err.stack);
    } else {
        console.log('Connected to MySQL database.');
        initializeTables().then(() => connection.release());
    }
});

async function initializeTables() {
    try {
        // Users / Customers
        await pool.promise().query(`CREATE TABLE IF NOT EXISTS Users (
            id VARCHAR(255) PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(255),
            spent FLOAT DEFAULT 0,
            orders_count INT DEFAULT 0,
            role VARCHAR(50) DEFAULT 'customer',
            status VARCHAR(50) DEFAULT 'Active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        // Products
        await pool.promise().query(`CREATE TABLE IF NOT EXISTS Products (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            price FLOAT NOT NULL,
            stock_quantity INT DEFAULT 0,
            category VARCHAR(255),
            images TEXT,
            is_active INT DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        // Orders
        await pool.promise().query(`CREATE TABLE IF NOT EXISTS Orders (
            id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255),
            customer_name VARCHAR(255),
            total_amount FLOAT NOT NULL,
            items_summary TEXT,
            status VARCHAR(50) DEFAULT 'Pending',
            collection_time VARCHAR(255),
            payment_status VARCHAR(50) DEFAULT 'pending',
            payment_id VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE SET NULL
        )`);

        // Order Items
        await pool.promise().query(`CREATE TABLE IF NOT EXISTS Order_Items (
            id VARCHAR(255) PRIMARY KEY,
            order_id VARCHAR(255) NOT NULL,
            product_id VARCHAR(255) NOT NULL,
            quantity INT NOT NULL,
            price_at_purchase FLOAT NOT NULL,
            FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE
        )`);

        // Enquiries
        await pool.promise().query(`CREATE TABLE IF NOT EXISTS Enquiries (
            id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255),
            customer_name VARCHAR(255),
            type VARCHAR(100) NOT NULL,
            event_date VARCHAR(255),
            guests INT,
            details TEXT,
            status VARCHAR(50) DEFAULT 'Pending',
            received VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE SET NULL
        )`);

        // Events
        await pool.promise().query(`CREATE TABLE IF NOT EXISTS Events (
            id VARCHAR(255) PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date VARCHAR(255) NOT NULL,
            location VARCHAR(255),
            attendees INT DEFAULT 0,
            maxAttendees INT DEFAULT 0,
            status VARCHAR(50) DEFAULT 'Upcoming',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        console.log('Database tables initialized.');
        await seedMockData();
    } catch (err) {
        console.error('Failed to initialize tables:', err);
    }
}

async function seedMockData() {
    try {
        // Products
        const [prodRes] = await pool.promise().query("SELECT COUNT(*) as count FROM Products");
        if (parseInt(prodRes[0].count) === 0) {
            await pool.promise().query(`INSERT INTO Products (id, name, category, price, stock_quantity, is_active) VALUES (?, ?, ?, ?, ?, ?)`, ['1', 'Marmelo Sourdough Loaf', 'Bakery', 4.50, 24, 1]);
            await pool.promise().query(`INSERT INTO Products (id, name, category, price, stock_quantity, is_active) VALUES (?, ?, ?, ?, ?, ?)`, ['2', 'Organic Olive Oil 500ml', 'Pantry', 12.00, 15, 1]);
            await pool.promise().query(`INSERT INTO Products (id, name, category, price, stock_quantity, is_active) VALUES (?, ?, ?, ?, ?, ?)`, ['3', 'Chocolate Babka', 'Bakery', 6.50, 8, 1]);
            await pool.promise().query(`INSERT INTO Products (id, name, category, price, stock_quantity, is_active) VALUES (?, ?, ?, ?, ?, ?)`, ['4', 'Seasonal Vegetable Box', 'Produce', 18.00, 0, 1]);
            await pool.promise().query(`INSERT INTO Products (id, name, category, price, stock_quantity, is_active) VALUES (?, ?, ?, ?, ?, ?)`, ['5', 'Marmelo Apricot Jam', 'Pantry', 5.50, 42, 1]);
            await pool.promise().query(`INSERT INTO Products (id, name, category, price, stock_quantity, is_active) VALUES (?, ?, ?, ?, ?, ?)`, ['6', 'Roasted Coffee Beans 250g', 'Beverages', 8.50, 12, 0]);
        }

        // Orders
        const [ordRes] = await pool.promise().query("SELECT COUNT(*) as count FROM Orders");
        if (parseInt(ordRes[0].count) === 0) {
            await pool.promise().query(`INSERT INTO Orders (id, customer_name, items_summary, created_at, total_amount, status, collection_time) VALUES (?, ?, ?, ?, ?, ?, ?)`, ['ORD-7290', 'Sarah Jenkins', 'Sourdough Loaf (x2), Olive Oil (x1)', '2026-03-04 08:30:00', 45.50, 'Pending', '12:30 PM']);
            await pool.promise().query(`INSERT INTO Orders (id, customer_name, items_summary, created_at, total_amount, status, collection_time) VALUES (?, ?, ?, ?, ?, ?, ?)`, ['ORD-7289', 'Michael Chen', 'Seasonal Vegetable Box (x3), Apricot Jam (x2)', '2026-03-04 07:15:00', 120.00, 'In Preparation', '11:00 AM']);
            await pool.promise().query(`INSERT INTO Orders (id, customer_name, items_summary, created_at, total_amount, status, collection_time) VALUES (?, ?, ?, ?, ?, ?, ?)`, ['ORD-7288', 'Emma Thompson', 'Chocolate Babka (x1), Sourdough Loaf (x1)', '2026-03-03 18:45:00', 28.90, 'Ready', '09:00 AM']);
            await pool.promise().query(`INSERT INTO Orders (id, customer_name, items_summary, created_at, total_amount, status, collection_time) VALUES (?, ?, ?, ?, ?, ?, ?)`, ['ORD-7287', 'James Wilson', 'Roasted Coffee Beans (x4)', '2026-03-03 14:20:00', 65.00, 'Collected', '04:30 PM (Yesterday)']);
        }

        // Enquiries
        const [enqRes] = await pool.promise().query("SELECT COUNT(*) as count FROM Enquiries");
        if (parseInt(enqRes[0].count) === 0) {
            await pool.promise().query(`INSERT INTO Enquiries (id, customer_name, type, event_date, guests, status, received, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, ['ENQ-042', 'David Smith', 'Catering', '2026-06-15', 50, 'Pending', 'Today, 09:12 AM', "Looking for a buffet setup for a corporate lunch event."]);
            await pool.promise().query(`INSERT INTO Enquiries (id, customer_name, type, event_date, guests, status, received, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, ['ENQ-041', 'Jessica Taylor', 'Venue Hire', '2026-05-20', 30, 'Approved', 'Yesterday, 14:30', "Private birthday party. Will need the venue from 6PM to 11PM."]);
        }

        // Users
        const [usrRes] = await pool.promise().query("SELECT COUNT(*) as count FROM Users");
        if (parseInt(usrRes[0].count) === 0) {
            await pool.promise().query(`INSERT INTO Users (id, email, password_hash, name, phone, orders_count, spent, status, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, ['ADMIN-001', 'admin@marmelo.com', 'admin_hash', 'Marmelo Admin', '+44 7700 000000', 0, 0, 'Active', 'admin']);
            await pool.promise().query(`INSERT INTO Users (id, email, password_hash, name, phone, orders_count, spent, status, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, ['CUST-088', 'sarah.j@example.com', 'hash', 'Sarah Jenkins', '+44 7700 900123', 12, 450.50, 'Active', 'customer']);
            await pool.promise().query(`INSERT INTO Users (id, email, password_hash, name, phone, orders_count, spent, status, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, ['CUST-087', 'm.chen@example.com', 'hash', 'Michael Chen', '+44 7700 900456', 3, 185.00, 'Active', 'customer']);
            await pool.promise().query(`INSERT INTO Users (id, email, password_hash, name, phone, orders_count, spent, status, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, ['CUST-086', 'emma.t@example.com', 'hash', 'Emma Thompson', '+44 7700 900789', 24, 1240.80, 'VIP', 'customer']);
        }

        // Events
        const [evtRes] = await pool.promise().query("SELECT COUNT(*) as count FROM Events");
        if (parseInt(evtRes[0].count) === 0) {
            await pool.promise().query(`INSERT INTO Events (id, title, date, location, attendees, maxAttendees, status) VALUES (?, ?, ?, ?, ?, ?, ?)`, ['1', 'Sourdough Masterclass', '2026-04-15 18:00:00', 'Marmelo Main Kitchen', 12, 15, 'Upcoming']);
            await pool.promise().query(`INSERT INTO Events (id, title, date, location, attendees, maxAttendees, status) VALUES (?, ?, ?, ?, ?, ?, ?)`, ['2', 'Spring Wine Tasting', '2026-05-02 19:30:00', 'Marmelo Private Dining', 24, 30, 'Upcoming']);
        }
    } catch (err) {
        console.error('Failed to seed DB:', err);
    }
}

module.exports = pool;
