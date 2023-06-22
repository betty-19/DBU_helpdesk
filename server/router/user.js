const express = require('express')
const router = express.Router();
const {
    createTicket,
    ViewTickets,
    viewFAQ,
  } = require("../controllers/user");
  
  //admin routes
  router.post("/createTicket", createTicket);
  router.get("/getTicketByCreaterId", ViewTickets);
  router.get("/faq", viewFAQ)
  
  module.exports = router;