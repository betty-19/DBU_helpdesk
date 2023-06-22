const express = require('express')
const router = express.Router();
const {
    newUser,
    searchEmployeeId
  } = require("../controllers/admin");
  
  //admin routes

router.get('/newuser', newUser);
router.get('/searchEmployeeId', searchEmployeeId);
  
  module.exports = router;