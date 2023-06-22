const mysql = require("mysql");

// Create a MySQL connection pool
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "hrms",
});

// Export the database pool
module.exports = db;
