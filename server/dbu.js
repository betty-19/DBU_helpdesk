const mysql = require("mysql");

// Create a MySQL connection pool
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "helpdesk2",
});

// Export the database pool
module.exports = db;



