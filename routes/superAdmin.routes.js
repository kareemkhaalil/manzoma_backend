const express = require("express");
const router = express.Router();
const superAdminController = require("../controllers/superAdmin.controller");

// Register Super Admin
router.post("/register", superAdminController.register);

// Login
router.post("/login", superAdminController.login);

// Get all
router.get("/", superAdminController.getAll);

module.exports = router;
