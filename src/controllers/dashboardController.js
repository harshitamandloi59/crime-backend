const Complaint = require("../models/Complaint");

exports.getDashboardCounts = async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: "Pending" });
    const underReview = await Complaint.countDocuments({
      status: "Under Review",
    });
    const investigation = await Complaint.countDocuments({
      status: "Investigation",
    });
    const resolved = await Complaint.countDocuments({ status: "Resolved" });

    res.json({
      total,
      pending,
      underReview,
      investigation,
      resolved,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
