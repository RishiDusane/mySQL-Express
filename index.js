const express = require('express');
const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/busRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bus booking server is running!');
});

app.use('/users', userRoutes);
app.use('/buses', busRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
