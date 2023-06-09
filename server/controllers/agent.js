const connection = require("../dbu")
const viewAssignedTickets = (req, res, next) => {
  const aggentId = req.query.assignedId;
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
    t.assignedTo = ? AND status != "closed"
    `;
    connection.query(sql,aggentId, (err, result) => {
      if (err) {

        console.error('Error fetching data from the database:', err);
        res.status(500).json({ error: 'An error occurred while fetching tickets' });
        return;
      }
      console.log('Tickets ---fetched successfully');
      res.status(200).json(result);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching tickets' });
  }
  };


  //Complete Tickets
  const completeTicket = (req,res, next) =>{
    ticketId = req.query.selectedTicket;
    console.log("ticketId");
     const qq = "UPDATE `ticket2` SET `status`='Fixed' WHERE id = ?";
     connection.query(qq,ticketId, (err, result) => {
      if (err) {
        console.error('Error fetching data from the database:', err);
        res.status(500).json({ error: 'An error occurred while fetching tickets' });
        return;
      }
      console.log('Tickets === successfully');
      console.log("success");
      res.status(200).json(result);
    });
  }


  //View all Closed tickets
  const viewClosedTickets = (req, res, next) =>{
    empId = req.query.assignedId;
    console.log("ticketId");
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
     t.assignedTo = ? AND status = "closed"
     `
     connection.query(sql,empId, (err, result) => {
      if (err) {
        console.error('Error fetching ===== from the database:', err);
        res.status(500).json({ error: 'An error occurred while fetching tickets' });
        return;
      }
      console.log('Tickets 88888 successfully');
      console.log("success");
      res.status(200).json(result);
    });
  }
  const totalAssignedTickets = (req, res, next) =>{
    empId = req.query.assignedId;
    console.log("ticketId");
     const sql = `SELECT COUNT(*) AS totalUsers FROM ticket2 WHERE assignedTo = ?`
     connection.query(sql, empId, (error, results) => {
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

  const totalClosedTickets = (req, res, next) =>{
    empId = req.query.assignedId;
    console.log("ticketId");
    const sql = `SELECT COUNT(*) AS totalUsers FROM ticket2 WHERE assignedTo = ? AND status = "closed"`
    connection.query(sql,empId, (error, results) => {
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
    viewAssignedTickets,
    completeTicket,
    viewClosedTickets,
    totalClosedTickets,
    totalAssignedTickets
  };