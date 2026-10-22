
const express = require('express');
const mysql = require('mysql2');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rishi@2830',
    database: 'testDB'
});

connection.connect((err) => {
    if (err) {
        console.log("Error connecting to database:", err.message);
        return;
    }

    console.log("Connected to the database");

    const createQuery = `CREATE TABLE IF NOT EXISTS Students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(100)
    )`;

    connection.query(createQuery, (err, result) => {
        if (err) {
            console.log("Error in creating table:", err.message);
            return;
        }

        console.log("Table created successfully");
    });
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
