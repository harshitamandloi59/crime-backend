const Complaint = require("../models/Complaint");
const generateCaseId = require("../utils/generateCaseId");


exports.createComplaint = async (req, res) => {
     console.log("BODY => ", req.body);
  try {
    const complaint = await Complaint.create({
      ...req.body,
      caseId: generateCaseId(),
      createdBy: req.user._id,
    });

    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.getComplaints = async (req, res) => {
//   const complaints = await Complaint.find().sort({ createdAt: -1 });
//   res.json(complaints);
// };
exports.getComplaints = async (req, res) => {
  try {
    let complaints;

    if (req.user.role === "admin") {
      complaints = await Complaint.find()
        .populate("createdBy", "name email department")
        .sort({ createdAt: -1 });
    } else {
      complaints = await Complaint.find({ createdBy: req.user._id }).sort({
        createdAt: -1,
      });
    }

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = ["Pending", "In Progress", "Resolved", "Rejected"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    await complaint.save();

    res.json({
      message: "Status updated successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    await complaint.deleteOne();

    res.json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
