# Bus Booking API

This project uses Express and MySQL. The files are organized like this:

- `index.js` starts the server and sets up the URLs.
- `utils/db-connection.js` connects to MySQL.
- `controller/userController.js` contains the user database queries.
- `controller/busController.js` contains the bus database queries.
- `routes/userRoutes.js` contains the user routes.
- `routes/busRoutes.js` contains the bus routes.
- `bus.sql` creates the tables, if you need them.
- `sample-data.sql` has example users, buses, bookings, and payments.

## Start the server

The default database name is `bus`. Set your MySQL password in PowerShell before starting:

```powershell
$env:DB_PASSWORD = "<your MySQL password>"
$env:DB_NAME = "bus"
npm start
```

You can also set `DB_HOST`, `DB_PORT`, and `DB_USER` if your MySQL settings are different. If you still need to create the tables, run `bus.sql` first. Then run `sample-data.sql` in MySQL to add the example data.

## API routes

- `POST http://localhost:3000/users` adds a user. Example JSON:
  `{"name":"Sam Lee","email":"sam@example.com"}`
- `GET http://localhost:3000/users` gets all users.
- `POST http://localhost:3000/buses` adds a bus. Example JSON:
  `{"busID":6,"busNumber":106,"totalSeats":40,"availableSeats":32}`
- `GET http://localhost:3000/buses/available/10` gets buses with more than 10 available seats.

For POST requests in Postman, choose **Body > raw > JSON**.
