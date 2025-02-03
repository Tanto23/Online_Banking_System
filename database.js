const mysql = require('mysql2/promise.js');

const transaction = mysql.createPool({
    host: 'sql10.freesqldatabase.com',
    user: 'sql10760823',
    password: 'iQLpsIBuR3',
    database: 'sql10760823',

    connectionLimit: 10,
    queueLimit: 0
});

transaction.getConnection((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});
const db = require('./models'); 

const getUsers = async (req, res) => {
    try {
        const [users] = await db.execute("SELECT * FROM users");
        res.json(users);
    } catch (error) {
        console.error("Database query failed:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};



module.exports = transaction;
