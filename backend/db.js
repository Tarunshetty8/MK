require('dotenv').config();
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

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


        await pool.promise().query(`
            CREATE TABLE IF NOT EXISTS Products (
                id VARCHAR(50) PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description TEXT,
                price FLOAT NOT NULL,
                flash_sale_price FLOAT DEFAULT NULL,
                is_flash_sale INT DEFAULT 0,
                stock_quantity INT DEFAULT 0,
                category VARCHAR(50),
                images TEXT,
                is_active BOOLEAN DEFAULT true,
                expiry_date VARCHAR(255) DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Safely alter existing table to add new columns if they do not exist
        try {
            await pool.promise().query("ALTER TABLE Products ADD COLUMN expiry_date VARCHAR(255) DEFAULT NULL");
        } catch (e) {
            if (e.code !== 'ER_DUP_FIELDNAME') console.error('Error adding expiry_date:', e.message);
        }
        try {
            await pool.promise().query("ALTER TABLE Products ADD COLUMN flash_sale_price FLOAT DEFAULT NULL");
        } catch (e) {
            if (e.code !== 'ER_DUP_FIELDNAME') console.error('Error adding flash_sale_price:', e.message);
        }
        
        try {
            await pool.promise().query("ALTER TABLE Products ADD COLUMN is_flash_sale INT DEFAULT 0");
        } catch (e) {
            if (e.code !== 'ER_DUP_FIELDNAME') console.error('Error adding is_flash_sale:', e.message);
        }  await pool.promise().query(`CREATE TABLE IF NOT EXISTS Orders (
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


        await pool.promise().query(`CREATE TABLE IF NOT EXISTS Order_Items (
            id VARCHAR(255) PRIMARY KEY,
            order_id VARCHAR(255) NOT NULL,
            product_id VARCHAR(255) NOT NULL,
            quantity INT NOT NULL,
            price_at_purchase FLOAT NOT NULL,
            FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE
        )`);


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

        const [prodRes] = await pool.promise().query("SELECT COUNT(*) as count FROM Products");
        if (parseInt(prodRes[0].count) >= 0) { // We update existing or insert new to ensure new branding is present
            // Let's just truncate for local dev if we wanted, but to be safe we'll use REPLACE INTO or just INSERT with original IDs.
            // Using REPLACE INTO is simpler here to overwrite the existing IDs with new data.
            await pool.promise().query(`REPLACE INTO Products (id, name, category, price, flash_sale_price, is_flash_sale, stock_quantity, is_active, expiry_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, ['1', 'House Blend Coffee Beans 250g', 'Beverages', 12.50, 9.99, 1, 24, 1, '2026-12-31']);
            await pool.promise().query(`REPLACE INTO Products (id, name, category, price, flash_sale_price, is_flash_sale, stock_quantity, is_active, expiry_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, ['2', 'Organic Hass Avocados (x2)', 'Produce', 4.00, null, 0, 15, 1, '2026-04-10']);
            await pool.promise().query(`REPLACE INTO Products (id, name, category, price, flash_sale_price, is_flash_sale, stock_quantity, is_active, expiry_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, ['3', 'Natural Orange Wine 750ml', 'Wine', 22.50, null, 0, 8, 1, null]);
            await pool.promise().query(`REPLACE INTO Products (id, name, category, price, flash_sale_price, is_flash_sale, stock_quantity, is_active, expiry_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, ['4', 'Local Craft IPA 4-pack', 'Beer', 14.00, null, 0, 0, 1, '2026-08-01']);
            await pool.promise().query(`REPLACE INTO Products (id, name, category, price, flash_sale_price, is_flash_sale, stock_quantity, is_active, expiry_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, ['5', 'Seasonal Organic Veg Box', 'Produce', 18.50, null, 0, 42, 1, '2026-03-30']);
            await pool.promise().query(`REPLACE INTO Products (id, name, category, price, flash_sale_price, is_flash_sale, stock_quantity, is_active, expiry_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, ['6', 'Fresh Sourdough Loaf', 'Bakery', 5.50, null, 0, 12, 1, '2026-03-27']);
        }


        const [ordRes] = await pool.promise().query("SELECT COUNT(*) as count FROM Orders");
        if (parseInt(ordRes[0].count) >= 0) {
            await pool.promise().query(`REPLACE INTO Orders (id, customer_name, items_summary, created_at, total_amount, status, collection_time) VALUES (?, ?, ?, ?, ?, ?, ?)`, ['ORD-7290', 'Sarah Jenkins', 'House Blend Coffee Beans (x2), Sourdough Loaf (x1)', '2026-03-04 08:30:00', 30.50, 'Pending', '12:30 PM']);
            await pool.promise().query(`REPLACE INTO Orders (id, customer_name, items_summary, created_at, total_amount, status, collection_time) VALUES (?, ?, ?, ?, ?, ?, ?)`, ['ORD-7289', 'Michael Chen', 'Seasonal Organic Veg Box (x3), Natural Orange Wine (x2)', '2026-03-04 07:15:00', 100.50, 'In Preparation', '11:00 AM']);
            await pool.promise().query(`REPLACE INTO Orders (id, customer_name, items_summary, created_at, total_amount, status, collection_time) VALUES (?, ?, ?, ?, ?, ?, ?)`, ['ORD-7288', 'Emma Thompson', 'Fresh Sourdough Loaf (x1), Organic Hass Avocados (x1)', '2026-03-03 18:45:00', 9.50, 'Ready', '09:00 AM']);
            await pool.promise().query(`REPLACE INTO Orders (id, customer_name, items_summary, created_at, total_amount, status, collection_time) VALUES (?, ?, ?, ?, ?, ?, ?)`, ['ORD-7287', 'James Wilson', 'Local Craft IPA 4-pack (x4)', '2026-03-03 14:20:00', 56.00, 'Collected', '04:30 PM (Yesterday)']);
        }


        const [enqRes] = await pool.promise().query("SELECT COUNT(*) as count FROM Enquiries");
        if (parseInt(enqRes[0].count) === 0) {
            await pool.promise().query(`INSERT INTO Enquiries (id, customer_name, type, event_date, guests, status, received, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, ['ENQ-042', 'David Smith', 'Catering', '2026-06-15', 50, 'Pending', 'Today, 09:12 AM', "Looking for a buffet setup for a corporate lunch event."]);
            await pool.promise().query(`INSERT INTO Enquiries (id, customer_name, type, event_date, guests, status, received, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, ['ENQ-041', 'Jessica Taylor', 'Venue Hire', '2026-05-20', 30, 'Approved', 'Yesterday, 14:30', "Private birthday party. Will need the venue from 6PM to 11PM."]);
        }


        const [usrRes] = await pool.promise().query("SELECT COUNT(*) as count FROM Users");
        if (parseInt(usrRes[0].count) === 0) {
            const adminHash = bcrypt.hashSync('admin123', 10);
            const userHash = bcrypt.hashSync('password', 10);
            await pool.promise().query(`INSERT INTO Users (id, email, password_hash, name, phone, orders_count, spent, status, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, ['ADMIN-001', 'admin@marmelo.com', adminHash, 'Marmelo Admin', '+44 7700 000000', 0, 0, 'Active', 'admin']);
            await pool.promise().query(`INSERT INTO Users (id, email, password_hash, name, phone, orders_count, spent, status, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, ['CUST-088', 'sarah.j@example.com', userHash, 'Sarah Jenkins', '+44 7700 900123', 12, 450.50, 'Active', 'customer']);
            await pool.promise().query(`INSERT INTO Users (id, email, password_hash, name, phone, orders_count, spent, status, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, ['CUST-087', 'm.chen@example.com', userHash, 'Michael Chen', '+44 7700 900456', 3, 185.00, 'Active', 'customer']);
            await pool.promise().query(`INSERT INTO Users (id, email, password_hash, name, phone, orders_count, spent, status, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, ['CUST-086', 'emma.t@example.com', userHash, 'Emma Thompson', '+44 7700 900789', 24, 1240.80, 'VIP', 'customer']);
        }

        // Force update the admin password on every startup in case the live DB already seeded 'admin_hash'
        const adminHashLive = bcrypt.hashSync('admin123', 10);
        await pool.promise().query(`UPDATE Users SET password_hash = ? WHERE email = 'admin@marmelo.com'`, [adminHashLive]);

        const [evtRes] = await pool.promise().query("SELECT COUNT(*) as count FROM Events");
        if (parseInt(evtRes[0].count) >= 0) {
            await pool.promise().query(`REPLACE INTO Events (id, title, date, location, attendees, maxAttendees, status) VALUES (?, ?, ?, ?, ?, ?, ?)`, ['1', 'Coffee Brewing Masterclass', '2026-04-15 18:00:00', 'Marmelo Cafe Area', 12, 15, 'Upcoming']);
            await pool.promise().query(`REPLACE INTO Events (id, title, date, location, attendees, maxAttendees, status) VALUES (?, ?, ?, ?, ?, ?, ?)`, ['2', 'Natural Wine Tasting', '2026-05-02 19:30:00', 'Marmelo Cellar', 24, 30, 'Upcoming']);
        }
    } catch (err) {
        console.error('Failed to seed DB:', err);
    }
}

module.exports = pool;
