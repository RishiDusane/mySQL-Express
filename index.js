
const express = require('express');
const db= require('./utils/db-connection');
const studentRoutes = require('./routes/studentsRoutes');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use("/students", studentRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
