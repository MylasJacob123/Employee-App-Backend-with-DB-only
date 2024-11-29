const express = require("express");
const router = express.Router();
const { addEmployee, getEmployees, deleteEmployee, updateEmployee } = require("../Controllers/db");

router.post("/addEmployee", addEmployee);
router.get("/getEmployees", getEmployees);
router.delete("/deleteEmployee/:id", deleteEmployee);
router.put("/updateEmployee/:id", updateEmployee); 

module.exports = router;