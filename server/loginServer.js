const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'helpdesk',
});

// take this line at the top. and install bcrypt package, command: [npm install bcrypt]
const bcrypt = require('bcrypt')

// Endpoint to handle the login request
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // console.log(req.body)
  // Query the database to check if the username and password match
    const query = "SELECT * FROM account WHERE username = ? AND status = 'active'"; 
    connection.query(query, username, async (error, results) => {
      if (error) {
        //   console.error('Error during login:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          if (results.length > 0) {
            // decrypt and compare the inserted password.
            if(await bcrypt.compare(password, results[0].password)){
              // Login successful
              delete results[0].password;
              res.json(results);
            } else {
            // Invalid username or password
            res.status(401).json({ error: 'Invalid username or password' });              
            }      
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
