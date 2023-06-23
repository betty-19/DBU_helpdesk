const express = require('express')
const router = express.Router();
const {
    newUser,
    searchEmployeeId,
    departments,
    newuserr,
    user,
    manager,
    agent,
    userStatus,
   reject,
   totalUser,
   totalManagers,
   totalAgents,
   totalRejected,
   totalAccepted,
   totalNewAccounts,
   totalDepartments
  } = require("../controllers/admin");
  
  //admin routes

router.get('/newuser', newUser);
router.get('/searchEmployeeId', searchEmployeeId);
router.get('/departments', departments);
router.get('/newuserr', newuserr);
router.get('/user', user);
router.get('/manager', manager);
router.get('/agent', agent);
router.put('/userStatus', userStatus);
router.put('/reject', reject);
router.get("/totalUsers", totalUser);
router.get("/totalManagers", totalManagers);
router.get("/totalAgents", totalAgents);
router.get("/totalDepartments",totalDepartments)
router.get("/totalNewAccounts",totalNewAccounts)
router.get("/totalAccepted",totalAccepted)
router.get("/totalRejected",totalRejected)
  
  module.exports = router;