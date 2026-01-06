const express = require("express");
const router = express.Router();
const { getDashboardCounts } = require("../controllers/dashboardController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/counts", protect, adminOnly, getDashboardCounts);

module.exports = router;
