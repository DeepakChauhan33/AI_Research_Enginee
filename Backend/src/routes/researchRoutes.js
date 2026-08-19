const express = require("express");

const router = express.Router();

// Import controllers
const { createResearch,
  getAlltResearche,
  getResearch,
  deleteResearch,
  updateStatus,
  updatePlan,
  updateAIStatus,
  getReport,
  getSources

} = require('../controllers/researchController');

// Import authentication middleware
const { authMiddleware } = require("../middleware/authMiddleware")


// Protected research routes
router.post("/", authMiddleware, createResearch);
router.get("/", authMiddleware, getAlltResearche);
router.get("/:id", authMiddleware, getResearch);
router.delete("/:id", authMiddleware, deleteResearch);
router.patch("/:id/status", authMiddleware, updateStatus);
router.patch("/:id/plan", authMiddleware, updatePlan);

router.get("/:id/report", authMiddleware, getReport);

router.get("/:id/source", authMiddleware, getSources);


// Internal AI status update
router.patch("/:id/ai-status", updateAIStatus);

module.exports = router;
