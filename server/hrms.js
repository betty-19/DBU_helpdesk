const mysql = require('mysql');
const Dbu_employees_db_con = require('./Dbu_db.js');

const app = express();
const port = 5002; // Specify the desired port number
const hrmsConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hrms',
});

const onSearch = (req, res) => {
  try {
    const { employeeId } = req.body;

    const sql = 'SELECT * FROM employee WHERE employeeId = ?';

    hrmsConnection.query(sql, [employeeId], (err, results) => {
      if (err) {
        console.error('Error searching for employee:', err);
        res.status(500).json({ error: 'An error occurred while searching for the employee' });
        return;
      }

      // Process the search results
      console.log(results);
      res.status(200).json(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while searching for the employee' });
  }
};

// Define the searchEmployee endpoint
app.post('/api/searchEmployee', onSearch);

// Rest of the code...

module.exports = {
  hrmsConnection,
  onSearch,
};
