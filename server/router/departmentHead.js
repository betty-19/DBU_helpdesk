const express = require('express')
const router = express.Router();
const {
  openTickets,
  viewSelectedTicketInfo,
  fetchAgents,
  assignTickets,
  ViewAssignedTickets,
  addFAQ,
  viewFaqs
  } = require("../controllers/departmentHead");
  
  //admin routes
  router.get("/getTickets", openTickets);
  router.get("/tickets", viewSelectedTicketInfo);
  router.get("/fetchAgents", fetchAgents);
  router.post("/assignTickets", assignTickets);
  router.get("/getAssignedTickets", ViewAssignedTickets);
  router.post("/addFAQ", addFAQ);
  router.get("/viewFaqs", viewFaqs);
  
  module.exports = router;