const express = require("express");
const router = express.Router();
const {
  getReports,
  createReport,
} = require("../controllers/report.controller");
const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize");

router.get("/", auth, authorize("reports"), getReports);
router.post("/", auth, authorize("reports", true), createReport);

module.exports = router;
