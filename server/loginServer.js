const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  //password: 'root',
  database: 'helpdesk2',
});

// take this line at the top. and install bcrypt package, command: [npm install bcrypt]
//const bcrypt = require('bcrypt')

// Endpoint to handle the login request
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // console.log(req.body)
  // Query the database to check if the username and password match
    const query = "SELECT * FROM account WHERE username = ?"; 
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
              const user = {
            id: results[0].id,
            username: results[0].username,
            role: results[0].role,
            employeeId : results[0].employeeId,
            department : results[0].department,
            status : results[0].status
          };
        
              res.json(user);
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
  console.log(`Login is running on port my ${port}`);
});
