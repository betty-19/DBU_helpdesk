const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5001;
app.use(cors());
app.use(express.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',      // Replace with your MySQL host
  user: 'root',           // Replace with your MySQL username
  password: "",   // Replace with your MySQL password
  database: 'helpdesk'     // Replace with your MySQL database name
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Handle POST requests to '/signup'
app.post('/signup', (req, res) => {
  // Get the signup data from the request body
  const { firstName, lastName, officeBlock, phoneNumber, favoriteNumber, birthDate, favoriteColor } = req.body;

  // Perform validation
//   if (!firstName || !lastName || !officeBlock || !phoneNumber || !favoriteNumber || !birthDate || !favoriteColor) {
//     res.status(400).json({ error: 'Please enter all fields' });
//     return;
//   }

  // Insert the signup data into the database
  const sql = 'INSERT INTO register (firstName, lastName, officeBlock, phoneNumber, favoriteNumber, birthDate, favoriteColor) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [firstName, lastName, officeBlock, phoneNumber, favoriteNumber, birthDate, favoriteColor];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      res.status(500).json({ error: 'An error occurred while signing up' });
      return;
    }
    console.log('Signup data inserted successfully');
    res.status(200).json({ message: 'Signup successful' });
  });
});


app.get('/api/categories', (req, res) => {
  const query = 'SELECT category FROM department';

  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching categories: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const categories = results.map((row) => row.category);
      res.json({ categories });
    }
  });
});





// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
