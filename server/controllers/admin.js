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
    const departments = (req, res ,next) => {
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
    };
    const user = (req, res ,next) => {
      const query = 'SELECT a.*, r.firstName FROM  account AS a JOIN register AS r ON a.id = r.accountId WHERE a.role = "user"';
    
      // Execute the query
      connection.query(query, (error, results) => {
        if (error) {
          console.error('Error fetching user information: ', error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          console.log(results);
          res.status(200).json(results);
        }
      });
    };
    const manager = (req, res ,next) => {
      const query = 'SELECT a.*, r.firstName FROM  account AS a JOIN register AS r ON a.id = r.accountId WHERE a.role = "manager"';
    
      // Execute the query
      connection.query(query, (error, results) => {
        if (error) {
          console.error('Error fetching user information: ', error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          console.log(results);
          res.status(200).json(results);
        }
      });
    };
    const agent = (req, res ,next) => {
      const query = 'SELECT a.*, r.firstName FROM  account AS a JOIN register AS r ON a.id = r.accountId WHERE a.role = "agent"';
    
      // Execute the query
      connection.query(query, (error, results) => {
        if (error) {
          console.error('Error fetching user information: ', error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          console.log(results);
          res.status(200).json(results);
        }
      });
    };

    const reject = (req, res, next) => {
      console.log("------");
      const userId = req.query.userId;
      // to account table
       const status= "Inactive"
       // to register table
       const isNew = "no"
       const state = "Reject"
      console.log(userId,"------");
    
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
    };
 const newuserr = (req, res) => {
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
};
const userStatus = (req, res) => {
  // const status = req.query.status.newStatus;
  // const Id = req.query.status.userId;
  const userId = req.query.userId;
  const newStatus = req.body.status;
  const query = 'UPDATE `account` SET `status`=? WHERE employeeId=?';
 values = [newStatus, userId]
 console.log(values);
  // Execute the query
  connection.query(query,values, (error, results) => {
    if (error) {
      console.error('Error fetching user information: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
};

const totalUser = (req, res) => {
  const query = 'SELECT COUNT(*) AS totalUsers FROM account WHERE role = "user"';
  
  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching user information:', error);
      res.status(500).send('Internal server error');
    } else {
      const totalUsers = results[0].totalUsers;
      res.status(200).send(totalUsers.toString());
      console.log(totalUsers);
    }
  });
};


const totalManagers = (req, res)=>{
  const query = 'SELECT COUNT(*) AS totalUsers FROM account WHERE role = "manager"';
  
  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching user information:', error);
      res.status(500).send('Internal server error');
    } else {
      const totalUsers = results[0].totalUsers;
      res.status(200).send(totalUsers.toString());
      console.log(totalUsers);
    }
  });
}
const totalAgents = (req, res)=>{
  const query = 'SELECT COUNT(*) AS totalUsers FROM account WHERE role = "agent"';
  
  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching user information:', error);
      res.status(500).send('Internal server error');
    } else {
      const totalUsers = results[0].totalUsers;
      res.status(200).send(totalUsers.toString());
      console.log(totalUsers);
    }
  });
}
const totalDepartments = (req, res)=>{
  const query = 'SELECT COUNT(*) AS totalUsers FROM department';
  
  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching user information:', error);
      res.status(500).send('Internal server error');
    } else {
      const totalUsers = results[0].totalUsers;
      res.status(200).send(totalUsers.toString());
      console.log("----");
           console.log(totalUsers);
      console.log("----");
 
    }
  });
}
const totalNewAccounts = (req, res)=>{
  const query = 'SELECT COUNT(*) AS totalUsers FROM account WHERE status = "waiting"';
  
  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching user information:', error);
      res.status(500).send('Internal server error');
    } else {
      const totalUsers = results[0].totalUsers;
      res.status(200).send(totalUsers.toString());
      console.log("Total New user");
      console.log(totalUsers);
    }
  });
}
const totalAccepted = (req, res)=>{
  const query = 'SELECT COUNT(*) AS totalUsers FROM register WHERE state = "Accept"';
  
  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching user information:', error);
      res.status(500).send('Internal server error');
    } else {
      const totalUsers = results[0].totalUsers;
      res.status(200).send(totalUsers.toString());
      console.log(totalUsers);
    }
  });
}
const totalRejected = (req, res)=>{
  const query = 'SELECT COUNT(*) AS totalUsers FROM register WHERE state = "Reject"';
  
  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching user information:', error);
      res.status(500).send('Internal server error');
    } else {
      const totalUsers = results[0].totalUsers;
      res.status(200).send(totalUsers.toString());
      console.log(totalUsers);
    }
  });
}

  module.exports = {
    newUser,
    searchEmployeeId, 
    departments,
    newuserr,
    user,
    manager,agent,
    userStatus,
   reject,
   totalUser,
   totalManagers,
   totalAgents,
   totalRejected,
   totalAccepted,
   totalNewAccounts,
   totalDepartments
  };