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

exports.getComplaints = async (req, res) => {
  const complaints = await Complaint.find().sort({ createdAt: -1 });
  res.json(complaints);
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;

  const complaint = await Complaint.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(complaint);
};

exports.deleteComplaint = async (req, res) => {
  await Complaint.findByIdAndDelete(req.params.id);
  res.json({ message: "Complaint deleted" });
};
