const db = require('../utils/db-connection');

const addUser = (req, res) => {
  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).send('Please provide a name and email.');
  }

  const insertQuery = 'INSERT INTO users (name, email) VALUES (?, ?)';

  db.execute(insertQuery, [name, email], (error, result) => {
    if (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).send('A user with this ID already exists.');
      }

      console.log('Error adding user:', error.message);
      return res.status(500).send('Error adding user.');
    }

    return res.status(201).json({
      id: result.insertId,
      message: `User ${name} was added successfully.`,
    });
  });
};

const getUsers = (req, res) => {
  const selectQuery = 'SELECT * FROM users';

  db.execute(selectQuery, (error, users) => {
    if (error) {
      console.log('Error getting users:', error.message);
      return res.status(500).send('Error getting users.');
    }

    return res.status(200).json(users);
  });
};

module.exports = {
  addUser,
  getUsers,
};
