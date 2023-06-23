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
  database: 'helpdesk2'    // Replace with your MySQL database name
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
app.get('/api/newuserr', (req, res) => {
  const query = 'SELECT firstName, employeeId,state FROM register WHERE new = "no"';

  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching user information: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const users = results.map((row) => ({
        firstName: row.firstName,
        employeeId: row.employeeId,
        state: row.state,
      }));
      res.json({ users });
    }
  });
});
//FETCH DEPARTMENT
app.get('/api/departments', (req, res) => {
  const query = 'SELECT * FROM department';

  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching user information: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(results);
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





// it change the value of the status column from pending to Accept
app.put('/api/update/:empId', (req, res) => {
  const userId = req.params.empId;
  // to account table
   const status= "active"
   const {role, department} = req.body;
   // to register table
   const approve ="yes"
   const isNew = "no"
   const state = "Accept"


  const accQuery = "UPDATE `account` SET `status` = ?, `role` = ?, `department` = ?  WHERE `employeeId` = ?";
  const accAalue = [status, role , department,userId]
  console.log(accAalue);
  connection.query(accQuery, accAalue, (error, results) => {
    if (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'User not found or no changes were made' });
    } else {
      const regQuery = "UPDATE `register` SET `approve` = ?, `new` = ?, `state` = ?  WHERE `employeeId` = ?";
      const regValue = [approve, isNew , state,userId]
    
      connection.query(regQuery, regValue, (error, results) => {
        if (error) {
          console.error('Error updating user:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: 'User not found or no changes were made' });
        } 
      });
      res.json({ message: 'User updated successfully' });
    }
  });
});//to activate

app.put('/api/activate', (req, res) => {
  const userId = req.query.userId;
   const status = req.query.newStatus;
  
  const query = "UPDATE `account` SET `status` = ?  WHERE `employeeId` = ?";
  const value = [status,userId]
  console.log(value);
  connection.query(query, value, (error, results) => {
    if (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'User not found or no changes were made' });
    } else {
      res.status(200).json(results);
    }
  });
});






//regect

app.put('/api/reject/:empId', (req, res) => {
  const userId = req.params.empId;
  // to account table
   const status= "Inactive"
   const {role, department} = req.body;
   // to register table
   const isNew = "no"
   const state = "Reject"
  

  const accQuery = "UPDATE `account` SET `status` = ? WHERE `employeeId` = ?";
  const accAalue = [status,userId]

  connection.query(accQuery, accAalue, (error, results) => {
    if (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'User not found or no changes were made' });
    } else {
      const regQuery = "UPDATE `register` SET `new` = ?, `state` = ?  WHERE `employeeId` = ?";
      const regValue = [isNew, state,userId]
    
      connection.query(regQuery, regValue, (error, results) => {
        if (error) {
          console.error('Error updating user:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: 'User not found or no changes were made' });
        } 
      });
      res.json({ message: 'User updated successfully' });
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
  console.log('NewUser is running on port 3003');
});
