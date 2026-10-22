const express = require('express');
const studentController = require('../controller/studentController');
const router = express.Router();

router.post("/add", studentController.addEntries);
router.put("/update/:id", studentController.updateEntries);
router.get("/", studentController.getEntries);
router.get("/:id", studentController.getEntryById);
router.delete("/delete/:id", studentController.deleteEntries);

module.exports = router;
