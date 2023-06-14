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
  
  const { title, chat, category } = req.body;


  const sql = 'INSERT INTO ticket (title, chat, category) VALUES (?, ?, ?)';
  const values = [title, chat, category];

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
