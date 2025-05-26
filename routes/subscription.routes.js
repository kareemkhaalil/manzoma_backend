const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscription.controller");

router.post("/", subscriptionController.create);
router.get("/", subscriptionController.getAll);
router.get("/:id", subscriptionController.getById);
router.put("/:id", subscriptionController.update);
router.delete("/:id", subscriptionController.remove);

module.exports = router;
