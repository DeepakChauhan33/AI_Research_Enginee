const mongoose = require("mongoose");

const researchJobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    topic: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["queued", "running", "completed", "failed"],
      default: "queued",
    },

    currentStage: {
      type: String,
      enum: [
        "pending",
        "planning",
        "researching",
        "extracting",
        "validating",
        "generating_report",
        "completed",
      ],
      default: "pending",
    },
  },


  {
    timestamps: true,
  }

)


const researchJob = mongoose.model("research", researchJobSchema);

module.exports = researchJob;