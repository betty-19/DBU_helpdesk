const connection = require("../dbu")
const createTicket = (req, res, next) => {
    
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
  };


  //View tickets
  const ViewTickets = (req, res,next) => {
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
  }
  const FixedTickets = (req, res,next) => {
    const createdBy = req.query.createdBy;
    try {
      const sql = `
      SELECT t.*, r.firstName, r.officeBlock
      FROM ticket2 AS t
      JOIN register AS r ON t.createdBy = r.employeeId
      WHERE r.employeeId = ? AND t.status="Fixed";
      
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
  }

  const VerifyTicket = (req,res, next) =>{
    ticketId = req.query.selectedTicket;
    console.log("ticketId");
     const qq = "UPDATE `ticket2` SET `status`='Closed' WHERE id = ?";
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

  //View  FAQ
  const viewFAQ = (req, res,next) => {
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

  module.exports = {
    createTicket,
    ViewTickets,
    viewFAQ,
    FixedTickets,
    VerifyTicket
  };