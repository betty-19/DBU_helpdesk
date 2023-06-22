const express = require('express')
const router = express.Router();
const {
  viewAssignedTickets,
  completeTicket,
  viewClosedTickets
  } = require("../controllers/agent");
  
  //admin routes
  router.get("/viewAssignedTickets", viewAssignedTickets);
  router.post("/completeTicket", completeTicket);
  router.get("/viewClosedTickets", viewClosedTickets);
  
  module.exports = router;