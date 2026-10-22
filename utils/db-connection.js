const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'testDB',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const createQuery = `CREATE TABLE IF NOT EXISTS Students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20),
    email VARCHAR(100)
)`;

let initializationError;
const initialization = process.env.DB_PASSWORD
    ? pool.promise().execute(createQuery)
        .then(() => {
            console.log("Connected to the database; Students table is ready");
        })
        .catch((err) => {
            initializationError = err;
            console.log("Error connecting to database or creating table:", err.message);
        })
    : Promise.resolve().then(() => {
        initializationError = new Error("DB_PASSWORD environment variable is required.");
        console.log(initializationError.message);
    });

const execute = (query, values, callback) => {
    if (typeof values === 'function') {
        callback = values;
        values = [];
    }

    initialization.then(() => {
        if (initializationError) {
            callback(initializationError);
            return;
        }
        pool.execute(query, values, callback);
    });
};

pool.on('error', (err) => {
    console.log("Database pool error:", err.message);
});

module.exports = { execute };
