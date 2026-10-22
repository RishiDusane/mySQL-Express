const db = require('../utils/db-connection');

const addBus = (req, res) => {
  const { busID, busNumber, totalSeats, availableSeats } = req.body || {};

  if (
    !Number.isInteger(busID) ||
    !Number.isInteger(busNumber) ||
    !Number.isInteger(totalSeats) ||
    !Number.isInteger(availableSeats) ||
    busID < 1 ||
    busNumber < 1 ||
    totalSeats < 1 ||
    availableSeats < 0 ||
    availableSeats > totalSeats
  ) {
    return res.status(400).send('Please provide valid bus details.');
  }

  const insertQuery =
    'INSERT INTO buses (busID, busNumber, totalSeats, availableSeats) VALUES (?, ?, ?, ?)';
  const values = [busID, busNumber, totalSeats, availableSeats];

  db.execute(insertQuery, values, (error) => {
    if (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).send('A bus with this ID already exists.');
      }

      console.log('Error adding bus:', error.message);
      return res.status(500).send('Error adding bus.');
    }

    return res.status(201).json({
      message: `Bus ${busNumber} was added successfully.`,
    });
  });
};

const getAvailableBuses = (req, res) => {
  const seats = Number(req.params.seats);

  if (!Number.isInteger(seats) || seats < 0) {
    return res.status(400).send('Please provide a valid number of seats.');
  }

  const selectQuery = 'SELECT * FROM buses WHERE availableSeats > ?';

  db.execute(selectQuery, [seats], (error, buses) => {
    if (error) {
      console.log('Error getting buses:', error.message);
      return res.status(500).send('Error getting buses.');
    }

    return res.status(200).json(buses);
  });
};

module.exports = {
  addBus,
  getAvailableBuses,
};
