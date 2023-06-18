const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());

// Configure the database connection
const connection = mysql.createConnection({
  host: 'localhost',      // Replace with your MySQL host
  user: 'root',           // Replace with your MySQL username
  password: 'root',           // Replace with your MySQL password
  database: 'helpdesk'    // Replace with your MySQL database name
});

// Establish the database connection
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
  } else {
    console.log('Connected to the database');
  }
});

// Define a route to fetch the categories
app.get('/api/getCategories', (req, res) => {
  const query = 'SELECT category FROM department';

  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching categories: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const categories = results.map((row) => row.category);
      res.json({ categories });
    }
  });
});

// register FAQ.
app.post('/api/registerFaq', (req, res) => {
  const { question, answer, category } = req.body;
   
  const values = [question, answer, category];

  const query = 'INSERT INTO FQA (question, answer, category) VALUES (?,?,?)';
  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error with registering FAQ: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {  
      res.status(200).json({ message: 'FAQ registered succefuly.'});
      return;
    }
  })
})

// 11
// fetch FAQ
app.get('/api/getFaq', (req, res) => {
  const query = 'SELECT * FROM FQA';

  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching FAQ: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else { 

      if(results.length>0){
        res.status(200).json(results);
        return;
      }

      res.status(500).json({ message: 'no FAQ in the table.'});
      return;
    }
  });
});

// register departments.
app.post('/api/registerDepartmentsInfo', (req, res) => {
  const { category } = req.body;
   
  const values = [category];
if (!category){
  res.status(500).json({ message: 'please provide input.'});
  return;
}
  const query = 'INSERT INTO department ( category) VALUES (?)';
  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error with registering department info: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {  
      res.status(200).json({ message: 'department info registered succefuly.'});
      return;
    }
  })
})

// 14
// fetch departments
app.get('/api/getDepartments', (req, res) => {
  const query = 'SELECT * FROM department';

  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching departments: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else { 
      if(results.length>0){
        res.status(200).json(results);
        return;
      }

      res.status(500).json({ message: 'no department info in the table.'});
      return;
    }
  });
});

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, this is the root URL');
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
