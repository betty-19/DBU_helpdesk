const express = require('express')
const router = express.Router();
const {
  viewAssignedTickets,
  completeTicket,
  viewClosedTickets,
  totalClosedTickets,
  totalAssignedTickets
  } = require("../controllers/agent");
  
  //admin routes
  router.get("/viewAssignedTickets", viewAssignedTickets);
  router.post("/completeTicket", completeTicket);
  router.get("/viewClosedTickets", viewClosedTickets);
  router.get("/totalAssignedTickets", totalAssignedTickets);
  router.get("/totalClosedTickets", totalClosedTickets);

  
  module.exports = router;