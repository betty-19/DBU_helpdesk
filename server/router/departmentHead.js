const express = require('express')
const router = express.Router();
const {
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
  } = require("../controllers/departmentHead");
  
  //admin routes
  router.get("/getTickets", openTickets);
  router.get("/tickets", viewSelectedTicketInfo);
  router.get("/fetchAgents", fetchAgents);
  router.post("/assignTickets", assignTickets);
  router.get("/getAssignedTickets", ViewAssignedTickets);
  router.post("/addFAQ", addFAQ); 
  router.get("/viewFaqs", viewFaqs);
  router.get("/totalOpenTickets", totalOpenTickets);
  router.get("/totalAssignedTickets", totalAssignedTickets);
  router.get("/totalClosedTickets", totalClosedTickets);
  
  module.exports = router;