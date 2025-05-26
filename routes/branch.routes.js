const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branch.controller");

router.post("/", branchController.create);
router.get("/", branchController.getAll);
router.get("/:id", branchController.getById);
router.put("/:id", branchController.update);
router.delete("/:id", branchController.remove);

module.exports = router;
