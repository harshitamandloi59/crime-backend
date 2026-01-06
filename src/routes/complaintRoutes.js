const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getComplaints,
  updateStatus,
  deleteComplaint,
} = require("../controllers/complaintController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/",protect, createComplaint);
router.get("/", protect, getComplaints);
router.patch("/:id/status", protect, updateStatus);

router.delete("/:id", protect, adminOnly, deleteComplaint);

module.exports = router;
