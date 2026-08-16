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

    // AI generated research plan
    researchPlan: {
      tasks: [
        {
          title: {
            type: String,
            required: true,
          },

          description: {
            type: String,
            required: true,
          },

          status: {
            type: String,
            enum: [
              "pending",
              "running",
              "completed",
              "failed",
            ],
            default: "pending",
          },
        },
      ],
    },
  },

  {
    timestamps: true,
  }
);

const ResearchJob = mongoose.model(
  "ResearchJob",
  researchJobSchema
);

module.exports = ResearchJob;