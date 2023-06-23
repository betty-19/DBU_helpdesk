const connection = require("../dbu")

const openTickets = (req, res, next) => {
  const department = req.query.department;
  try {
    const sql = `
    SELECT * FROM ticket2  WHERE  category = ? AND status= "Open";
    `;
    connection.query(sql,department, (err, result) => {
      if (err) {
    
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
}

const viewSelectedTicketInfo = (req,res,next)=>{
  const ticketId = req.query.ticketId;
  try {
    const sql = `
    SELECT
  t.*,
  r.firstName,
  r.officeBlock
FROM
  ticket2 AS t
JOIN
  register AS r ON t.createdBy = r.employeeId
WHERE
  t.id = ?
;
    `;
    connection.query(sql,ticketId, (err, result) => {
      if (err) {
        console.error('Error fetching data from the database:', err);
        res.status(500).json({ error: 'An error occurred while fetching tickets' });
        return;
      }
      res.status(200).json(result);
      console.log(result);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching tickets' });
  }
}


const fetchAgents = (req,res,next)=>{
  console.log("aaa");
  const department = req.query.department;
  console.log(department);
  const status = "active"
  console.log("bbb");
  try {
    const sql = `
    SELECT
    r.firstName,
    r.employeeId
  FROM
    register AS r
  JOIN
    account AS a ON r.accountId = a.id
  WHERE
    a.department = ? AND role = "agent" AND a.status = ?;
  
    `;
    const values = [
      department,
      status
    ]
    connection.query(sql,values, (err, result) => {
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
}


const assignTickets = (req, res) => {
  
  const { ticketId, agentId, agentName} = req.body;
  const status = "onprogress"
  console.log(ticketId, agentId,agentName)
  // here you can also add validation, whether those inputs are null or not, vallid datatype or not

  // check whether the ticket id is valid or not.
  const ticketQuery = 'UPDATE `ticket2` SET `assignedTo`=?,`agent_name`=?,`status`=? WHERE id = ?';
  const values = [
    agentId,
    agentName,
    status,
    ticketId,
  ]
  connection.query(ticketQuery, values, async (error, ticketResult) => {
        if (error) { 
          res.status(500).json({ error: 'An error occurred while finding verifeing the ticket.' });
          return;
        }else {
          res.status(200).json({success:true,message:"Ticket assigned Successfully"})
        }           
});
}

  //View tickets
  const ViewAssignedTickets = (req, res,next) => {
    const department = req.query.department;
    try {
      const sql = `
      SELECT t.*, r.firstName
      FROM ticket2 AS t
      JOIN register AS r ON t.createdBy = r.employeeId
      WHERE t.category = ? AND status != "Open";
      
      `;
      connection.query(sql,department, (err, result) => {
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
  }


  //aDD FAQ

  const addFAQ = (req, res) => {
    const { question, answer, category } = req.body;
     
    const values = [question, answer, category];
    console.log(values);
  
    const query = 'INSERT INTO faq (question, answer, category) VALUES (?,?,?)';
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error with registering FAQ: ', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {  
        res.status(200).json({ok:true, message: 'FAQ registered succefuly.'});
        return;
      }
    })
  }
const viewFaqs  = (req, res) => {
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
}

const totalOpenTickets = (req, res)=>{
  const query = 'SELECT COUNT(*) AS totalUsers FROM ticket2 WHERE status = "Open"';
  
  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching user information:', error);
      res.status(500).send('Internal server error');
    } else {
      const totalUsers = results[0].totalUsers;
      res.status(200).send(totalUsers.toString());
      console.log("--");
      console.log(totalUsers);
    }
  });
}

const totalAssignedTickets = (req, res)=>{
  const department = req.query.department;
  const query = 'SELECT COUNT(*) AS totalUsers FROM ticket2 WHERE assignedTo != "Not Assigned" ';
  
  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching user information:', error);
      res.status(500).send('Internal server error');
    } else {
      const totalUsers = results[0].totalUsers;
      res.status(200).send(totalUsers.toString());
      console.log("--");
      console.log(totalUsers);
    }
  });
}

const totalClosedTickets = (req, res)=>{
  const query = 'SELECT COUNT(*) AS totalUsers FROM ticket2 WHERE status = "closed"';
  
  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching user information:', error);
      res.status(500).send('Internal server error');
    } else {
      const totalUsers = results[0].totalUsers;
      res.status(200).send(totalUsers.toString());
      console.log("--");
      console.log(totalUsers);
    }
  });
}

  module.exports = {
    openTickets,
    viewSelectedTicketInfo,
    fetchAgents,
    assignTickets,
    ViewAssignedTickets,
    addFAQ,
    viewFaqs,
    totalClosedTickets,
    totalAssignedTickets,
    totalOpenTickets
  };