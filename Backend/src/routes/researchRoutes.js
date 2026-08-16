const express = require("express");

const router = express.Router();

// Import controllers
const { createResearch,
  getAlltResearche,
  getResearch,
  deleteResearch,
  updateStatus,
  updatePlan
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

module.exports = router;

// 6a7d68a03178b244457fd482

// 6a7ec95bcf58e692ac7d05fc