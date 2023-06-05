const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3003;
app.use(cors());
app.use(express.json());

// Configure the database connection
const connection = mysql.createConnection({
  host: 'localhost',      // Replace with your MySQL host
  user: 'root',           // Replace with your MySQL username
  password: "",           // Replace with your MySQL password
  database: 'helpdesk'    // Replace with your MySQL database name
});

// Establish the database connection
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
  } else {
    console.log('Connected to the database');
  }
});

// Define a route to fetch the new users
app.get('/api/newuser', (req, res) => {
  const query = 'SELECT firstName, empId,lastName,officeBlock FROM register WHERE new = "yes"';

  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching user information: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const users = results.map((row) => ({
        firstName: row.firstName,
        lastName: row.lastName,
        officeBlock:row.officeBlock,
        empId: row.empId,
      }));
      res.json({ users });
    }
  });
});
// employee
app.get('/api/employee', (req, res) => {
  const query = 'SELECT * FROM employee';

  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching employee information: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const user = results.map((row) => ({
        firstName: row.firstName,
        lastName: row.lastName,
        officeBlock:row.officeBlock,
        Department:row.Department,
        empId: row.empId,
      }));
      res.json({ user });
    }
  });
});
//end of employee
//for display table value
app.get('/api/employee2/:id', (req, res) => {
  const empId = req.params.id;
  const query = 'SELECT * FROM employee WHERE empId = ?';

  // Execute the query with the employee ID parameter
  connection.query(query, [empId], (error, results) => {
    if (error) {
      console.error('Error fetching employee information: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'Employee not found' });
      } else {
        const user = results.map((row) => ({
          firstName: row.firstName,
          lastName: row.lastName,
          officeBlock: row.officeBlock,
          department: row.Department,
          empId: row.empId,
        }));
        res.json({ user });
      }
    }
  });
});

//end of table value
app.get('/api/register', (req, res) => {
  // Query the database to get the required fields
  const query = 'SELECT firstName, lastName, officeBlock, empId FROM register WHERE new = "yes"';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error });
    } else {
      const userData = results.map((row) => ({
        firstName: row.firstName,
        lastName: row.Lname,
        officeBlock: row.office_block,
        empId: row.empId,
      }));
      res.json({ userData });
    }
  });
});

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, this is the root URL');
});

// Start the server
app.listen(port, () => {
  console.log('Server is running on port 3003');
});
