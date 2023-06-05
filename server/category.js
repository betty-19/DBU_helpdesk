const express = require('express');
// const mysql = require('mysql');
const connection = require('./dbu');
const cors = require('cors');

const app = express();
const port = 3002;
app.use(cors());
app.use(express.json());


// // Configure the database connection
// const connection = mysql.createConnection({
//     host: 'localhost',      // Replace with your MySQL host
//     user: 'root',           // Replace with your MySQL username
//     password: "",   // Replace with your MySQL password
//     database: 'helpdesk'     // Replace with your MySQL database name
//   });

// // Establish the database connection
// connection.connect((err) => {
//   if (err) {
//     console.error('Database connection failed: ', err);
//   } else {
//     console.log('Connectedd to the database');
//   }
// });

// Define a route to fetch the categories
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
// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, this is the root URL');
  });

// Start the server
app.listen(port, () => {
  console.log('Server is running on port 3002');
});
