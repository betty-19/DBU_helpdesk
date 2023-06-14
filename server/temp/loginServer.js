const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'helpdesk',
});

// Endpoint to handle the login request
app.post('user/login', (req, res) => {
  const { username, password } = req.body;

  // Query the database to check if the username and password match
  const query = 'SELECT * FROM register WHERE userName = ? AND password = ? AND role = "User"';
  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        // Login successful
        res.json({ message: 'Login successful' });
      } else {
        // Invalid username or password
        res.status(401).json({ error: 'Invalid username or password' });
      }
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
