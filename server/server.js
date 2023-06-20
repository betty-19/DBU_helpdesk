const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const Dbu_employees_db_con = require('./Dbu_db.js');
const bcrypt = require('bcryptjs');


const app = express();
const port = 5005;
app.use(cors());
app.use(express.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  //password: 'root',
  database: 'helpdesk2',
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
app.post('/signup', async (req, res) => {
  
  
  // Get the signup data from the request body
  const { firstName, lastName, officeBlock, officeNumber, phoneNumber, favoriteNumber, birthDate, favoriteColor ,  employeeId} = req.body;
  
  // here you can also add validation, whether those inputs are null or not, vallid datatype or not

  // // this query checks as this guy is an employee or not. You may remove it, if you want to, not to bee checked from the dbu database.
  // const query = 'SELECT * FROM Employees WHERE employeeId = ?';
  // Dbu_employees_db_con.query(query, employeeId, async (error, employee) => {
  //       if (error) { 
  //         res.status(500).json({ error: 'An error occurred while finding verifeing the employee.' });
  //         return;
  //       }else {
  //         // console.log(employee)
  //         if (employee.length>0){ // if he is an employee 

            const username = employeeId + '@helpdesk.dbu'; //= employeeId; // I take employee id as user  name you can change it.

            // this query checks if this employee is registered before? b/c username must be unique.
            const checkQuery = 'SELECT * FROM account WHERE username = ?';
            connection.query(checkQuery, username, async (err, result) => {
              if (err) {
                console.error('Error inserting data into the register:', err);
                res.status(500).json({ error: 'An error occurred while signing up' });
                return;
              }

              if(result.length>0){ // if registered before
                console.error('error code:', err);
                res.status(500).json({ error: 'Employee id must be unique.' });
                return;
              } 

              // Insert into account table.
              //const query = 'INSERT INTO account(username, password, role, department, employeeId, status) VALUES(?,?,?,?,?,?)';
              const query = 'INSERT INTO account(username, password, employeeId) VALUES(?,?,?)';
              const password = '#dbu1234' + lastName; // this is the best way to assign a different unique password.
              const password_hash = await bcrypt.hash(password, 10);
 // advanced encryption system for password
            //  const role = 'agent'; // employee[0].role;
             // const department = null; //employee[0].department;
            //  const defaultStatus = 'waiting'; 
           //   const account_atributes = [username, password_hash, role, department, employeeId, defaultStatus];
              const account_atributes = [username, password_hash, employeeId];
              
              connection.query(query, account_atributes, (err, result) => {
                  if (err) {
                    console.error('Error inserting data into the register:', err);
                    res.status(500).json({ error: 'An error occurred while signing up' });
                    return;
                  }
                  
                  // console.log("inserted Id: ",result.insertId)
                  const accountId = parseInt(result.insertId)  
                  // const isApproved = 'no';
                  // const newAccount = 'yes';
                  // const state = 'pending';
                  // const registerValues = [firstName, lastName, officeBlock, officeNumber, phoneNumber, favoriteNumber, birthDate, favoriteColor, isApproved, newAccount, state,  employeeId, accountId];
                  const registerValues = [firstName, lastName, officeBlock, officeNumber, phoneNumber, favoriteNumber, birthDate, favoriteColor , employeeId, accountId];
                  
                  // console.log(firstName, lastName, officeBlock, phoneNumber, favoriteNumber, birthDate, favoriteColor, isApproved, newAccount, state,  employeeId, accountId)
                  // Insert into register table
                  // const registerQuery = 'INSERT INTO register (firstName, lastName, officeBlock, officeNumber, phoneNumber, favoriteNumber, birthDate, favoriteColor, approve, new, state, employeeId, accountId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
                  const registerQuery = 'INSERT INTO register (firstName, lastName, officeBlock, officeNumber, phoneNumber, favoriteNumber, birthDate, favoriteColor, employeeId, accountId) VALUES (?,?,?,?,?,?,?,?,?,?)';
                  connection.query(registerQuery, registerValues, (err, result) => {
                    if (err) {
                      console.error('Error while inserting: ', err);
                      res.status(500).json({ error: 'An error occurred while signing up' });
                      return;
                    }
                    console.log("you secceed with registering.")
                    return res.status(200).json({ message: 'Signup successful' }); 
                  }) 
              }); 
              
            });// end of checkQuery


  //       } else {
  //         return res.status(404).json({ message: `No employee with id ${employeeId}` })
  //       }       
  //   }//  end of else
  // }); 


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
