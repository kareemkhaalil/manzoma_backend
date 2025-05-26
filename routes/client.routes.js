const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client.controller");

router.post("/", clientController.create);
router.get("/", clientController.getAll);
router.get("/:id", clientController.getById);
router.put("/:id", clientController.update);
router.delete("/:id", clientController.remove);

module.exports = router;
