const connection = require('../../database.js')
const bcrypt = require('bcrypt')

const signin = async (req,res) => {

    const { username, password } = req.body;

    // Query the database to check if the username and password match
    const query = "SELECT * FROM register WHERE username = ? AND password = ?"; 
    connection.query(query, [username], async (error, results) => {
        if (error) {
        //   console.error('Error during login:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          if (results.length > 0) {
            // decrypt and compare the inserted password.
            if(await bcrypt.compare(password, results[0].password))            
                // Login successful
                res.json({ message: 'Login successful' });
          } else {
            // Invalid username or password
            res.status(401).json({ error: 'Invalid username or password' });
          }
        }
      });
    }

module.exports= {signin} 
