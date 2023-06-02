const mysql = require('mysql');

// Configure the database connection
const connection = mysql.createConnection({
    host: 'localhost',      // Replace with your MySQL host
    user: 'root',           // Replace with your MySQL username
    password: "",   // Replace with your MySQL password
    database: 'helpdesk'     // Replace with your MySQL database name
  });

// Establish the database connection
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
  } else {
    console.log('Connectedd to the database');
  }
});