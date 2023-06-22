const mysql = require('mysql2'); // change it to mysql if doesn't work for you.

const Dbu_employees_db = mysql.createConnection({
    host: 'localhost',      
    user: 'root',            
   // password: "root",   // check your db password. 
    database: 'hrms'   
  });

module.exports = Dbu_employees_db;