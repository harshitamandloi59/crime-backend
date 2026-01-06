const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    caseId: {
      type: String,
      unique: true,
    },

    type: {
      type: String,
      required: true,
    },

    incidentDate: {
      type: Date,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    details: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Under Review", "Investigation", "Resolved"],
      default: "Pending",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Low",
    },

    ipcSection: String,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
