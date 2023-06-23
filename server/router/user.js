const express = require('express')
const router = express.Router();
const {
    createTicket,
    ViewTickets,
    viewFAQ,
    FixedTickets,
    VerifyTicket
  } = require("../controllers/user");
  
  //admin routes
  router.post("/createTicket", createTicket);
  router.get("/getTicketByCreaterId", ViewTickets);
  router.get("/getFixedTicketByCreaterId", FixedTickets);
  router.post("/verfiyTicket", VerifyTicket);
  router.get("/faq", viewFAQ)
  
  module.exports = router;