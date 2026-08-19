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

    aiResponse: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
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


    errorMessage: {
      type: String,
      default: null,
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


    sources: [
      {
        url: {
          type: String,
          required: true,
          trim: true,
        },

        title: {
          type: String,
          required: true,
          trim: true,
        },

        sourceName: {
          type: String,
          required: true,
          trim: true,
        },

        publishedAt: {
          type: Date,
        },

        content: {
          type: String,
        },

        status: {
          type: String,
          enum: [
            "found",
            "processing",
            "processed",
            "failed",
          ],
          default: "found",
        },
      },
    ],


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