const connection = require("../dbu")
const hrmsConnection = require("../db2");

  //New User for approvement
  const newUser = (req, res) => {
      const query = 'SELECT firstName, employeeId,lastName,officeBlock FROM register WHERE new = "yes"';
    
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
            employeeId: row.employeeId,
          }));
          res.json({ users });
        }
      });
    }

    const searchEmployeeId =(req,res,next)=>{
      try {
        const employeeId = req.query.employeeId;
    
        const sql = 'SELECT * FROM employees WHERE employeeId = ?';
    
        hrmsConnection.query(sql, employeeId, (err, results) => {
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
    



  module.exports = {
    newUser,
    searchEmployeeId
  };