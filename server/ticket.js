const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5002;
app.use(cors());
app.use(express.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',      
  user: 'root',           
  password: "",   
  database: 'helpdesk'     
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
app.post('/ticket', (req, res) => {
  // Get the signup data from the request body
  const { title, chat, category, creator_id } = req.body;

  // Perform validation
//   if (!firstName || !lastName || !officeBlock || !phoneNumber || !favoriteNumber || !birthDate || !favoriteColor) {
//     res.status(400).json({ error: 'Please enter all fields' });
//     return;
//   }

  // Insert the signup data into the database
  const sql = 'INSERT INTO ticket (title, chat, category,createdBy) VALUES (?, ?, ? , ?)';
  const values = [title, chat, category, creator_id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      res.status(500).json({ error: 'An error occurred while creating ticket' });
      return;
    }
    console.log('Ticket data inserted successfully');
    res.status(200).json({ message: 'ticket successful' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`ticket Server listening on port ${port}`);
});
