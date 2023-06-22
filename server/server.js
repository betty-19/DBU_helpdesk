const express = require('express');
const cors = require('cors');
const app = express ()
// Start the server#

const user =require('./router/user')
const agent =require('./router/agent')
const admin =require('./router/admin')
const dHead =require('./router/departmentHead')


app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET, POST"],
    credentials: true,
  }))
app.use(express.json());

app.use('/user', user)
app.use('/agent', agent)
app.use('/admin', admin)
app.use('/head', dHead)




const port = 8000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });