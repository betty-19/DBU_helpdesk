const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const authRoute = require('./routers/auth')   

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', authRoute)  

const PORT = parseInt(process.env.PORT)

app.listen(PORT, () => {
  console.log(`running on port ${PORT}...`)
})
 