INSERT INTO users (name, email)
SELECT 'Rishi Dusane', 'rishi@gmail.com'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'rishi@gmail.com');

INSERT INTO users (name, email)
SELECT 'Rahul Sharma', 'rahul@gmail.com'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'rahul@gmail.com');

INSERT INTO users (name, email)
SELECT 'Priya Patil', 'priya@gmail.com'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'priya@gmail.com');

INSERT INTO users (name, email)
SELECT 'Amit Kulkarni', 'amit@gmail.com'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'amit@gmail.com');

INSERT INTO users (name, email)
SELECT 'Sneha Joshi', 'sneha@gmail.com'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'sneha@gmail.com');

INSERT IGNORE INTO buses (busID, busNumber, totalSeats, availableSeats) VALUES
  (1, 101, 40, 35),
  (2, 102, 50, 42),
  (3, 103, 45, 30),
  (4, 104, 40, 20),
  (5, 105, 55, 50);

INSERT IGNORE INTO bookings (BookingId, seatNumber) VALUES
  (1, 5),
  (2, 12),
  (3, 18),
  (4, 22),
  (5, 30);

INSERT IGNORE INTO payments (PaymentID, paymentStatus) VALUES
  (1, 'SUCCESS'),
  (2, 'PENDING'),
  (3, 'FAILED'),
  (4, 'SUCCESS'),
  (5, 'SUCCESS');
