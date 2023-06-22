const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5002;
app.use(cors());
app.use(express.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',      
  user: 'root',           
 // password: "root",   
  database: 'helpdesk2'     
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
app.post('/ticket', async (req, res) => {
  // Get the signup data from the request body
  const { title, chat, category, creator_id } = req.body;
  const createdDate = new Date(); // Get the current date and time

  // Insert the signup data into the database
  const sql = 'INSERT INTO ticket2 (title, description, category, createdBy, createdDate) VALUES (?, ?, ?, ?, ?)';
  const values = [title, chat, category, creator_id, createdDate];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      res.status(500).json({ error: 'An error occurred while creating ticket', hint: 'check that you insert valid creator ID...' });
      return;
    }
    console.log('Ticket data inserted successfully');
    res.status(200).json({ message: 'Ticket created successfully' });
  });
});


app.get('/api/faq', async (req, res) => {
  try {
    const { category } = req.query;
    const sql = 'SELECT * FROM faq WHERE category = ?';
    connection.query(sql, [category], (err, result) => {
      if (err) {
        console.error('Error fetching FAQs from the database:', err);
        res.status(500).json({ error: 'An error occurred while fetching FAQs' });
        return;
      }
      console.log('FAQs fetched successfully');
      res.status(200).json(result);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching FAQs' });
  }
});


 

app.get('/api/getTickets', (req, res) => {
  const department = req.query.department;
  try {
    const sql = `
    SELECT * FROM ticket2  WHERE  category = ?;
    `;
    connection.query(sql,department, (err, result) => {
      if (err) {
    
        console.error('Error fetching data from the database:', err);
        res.status(500).json({ error: 'An error occurred while fetching tickets' });
        return;
      }
      console.log('Tickets fetched successfully');
      res.status(200).json(result);
      console.log(result);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching tickets' });
  }
});

// 6
// app.get('/api/getTicketByCreaterId', (req, res) => {
//   const createdBy = req.query.createdBy;

//   // this query will fetch all information of a single user(creater) from ticket and account based on the the creater id that found at both account and ticket table.
//   const query = 'SELECT * FROM ticket as t, account as a WHERE t.createdBy = ? AND t.createdBy = a.id';
//   connection.query(query, createdBy, async (error, result) => {
//         if (error) { 
//           console.log(error);
//           res.status(500).json({ error: 'An error occurred while finding ticket iformation.' });
//           return;
//         }else {
//           // console.log(result)
//           if (result.length>0){ // means there is data that fulfied the requirement. 

//             // you can delete other unwanted info following this command.
//             const wantedResult = result.map(({ password, createdBy, ...rest }) => rest);
           
//             res.status(200).json(wantedResult);
//           } else {
//           res.status(500).json({ message: 'no data identified by the given id.' });
//           }
//   }});
// });
app.get('/api/getTicketByCreaterId', async (req, res) => {
  const createdBy = req.query.createdBy;
  try {
    const sql = `
    SELECT t.*, r.firstName, r.officeBlock
    FROM ticket2 AS t
    JOIN register AS r ON t.createdBy = r.employeeId
    WHERE r.employeeId = ?;
    
    `;
    connection.query(sql,createdBy, (err, result) => {
      if (err) {
        console.log("error");
        console.error('Error fetching data from the database:', err);
        res.status(500).json({ error: 'An error occurred while fetching tickets' });
        return;
      }
      console.log('Tickets fetched successfully');
      res.status(200).json(result);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching tickets' });
  }
});
















// 7
app.get('/api/getAllAgentInfo', (req, res) => { 
  const role = req.body.role;

  // this query will fetch all information all agents we have. from the account and register table.
  const query = 'SELECT * FROM account as a, register as r WHERE a.id = r.accountId AND a.role = ?';
  connection.query(query, role, async (error, result) => {
        if (error) { 
          console.log(error);
          res.status(500).json({ error: 'An error occurred while finding agent iformation.' });
          return;
        }else {
          // console.log(result)
          if (result.length>0){ // means there is data that fulfied the requirement. 

            // you can delete other unwanted info following this command.
            const wantedResult = result.map(({ password, ...rest }) => rest);
           
            res.status(200).json(wantedResult);
          } else {
          res.status(500).json({ message: 'no agent data.' });
          }
  }});
});

// 8: diagram=> solved


// 9   store those value in the openTicket table

app.post('/api/assignTickets', async (req, res) => {
  
  const { ticketId, agentId} = req.body;
  const status = "onprogress"
  console.log(ticketId, agentId)
  // here you can also add validation, whether those inputs are null or not, vallid datatype or not

  // check whether the ticket id is valid or not.
  const ticketQuery = 'UPDATE `ticket2` SET `assignedTo`=?,`status`=? WHERE id = ?';
  const values = [
    agentId,
    status,
    ticketId
  ]
  connection.query(ticketQuery, values, async (error, ticketResult) => {
        if (error) { 
          res.status(500).json({ error: 'An error occurred while finding verifeing the ticket.' });
          return;
        }else {
          res.status(200).json({success:true})
        }           
});
});



// Start the server
app.listen(port, () => {
  console.log(`ticket Server listening on port ${port}`);
});
