const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendance.controller");

router.post("/checkin", attendanceController.checkin);
router.post("/checkout", attendanceController.checkout);
router.get("/report", attendanceController.getReport);

module.exports = router;
