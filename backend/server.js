const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5005;
app.use(cors());
app.use(express.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'helpdesk',
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
  const { firstName, lastName, officeBlock, phoneNumber, favoriteNumber, birthDate, favoriteColor ,  employeeId} = req.body;

  // Insert the signup data into the database
  const sql = 'INSERT INTO register (firstName, lastName, officeBlock, phoneNumber, favoriteNumber, birthDate, favoriteColor,empId) VALUES (?,?, ?, ?, ?, ?, ?, ?)';
  const values = [firstName, lastName, officeBlock, phoneNumber, favoriteNumber, birthDate, favoriteColor,  employeeId];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into the register:', err);
      res.status(500).json({ error: 'An error occurred while signing up' });
      return;
    }
    console.log('Signup data inserted successfully');
    res.status(200).json({ message: 'Signup successful' });
  });
});

// Handle POST requests to '/pend'
app.post('/pend', (req, res) => {
  // Get the last name and phone number from the request body
  const { lastName, phoneNumber } = req.body;

  // Insert the data into the pending table
  const sql = 'INSERT INTO pending (tempUserName, tempPass) VALUES (?, ?)';
  const values = [lastName, phoneNumber];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into the pending:', err);
      res.status(500).json({ error: 'An error occurred while pending' });
      return;
    }
    console.log('Pending data inserted successfully');
    res.status(200).json({ message: 'Pending successful' });
  });
});
app.put('/api/register/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { status } = req.body;

  try {
    // Find the user by ID
    const user = await Register.findByPk(userId);

    if (user) {
      // Update the status column
      user.status = status;
      await user.save();
      res.json({ success: true, message: 'User status updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
