const express = require("express");

const router = express.Router();

// Import controllers
const { createResearch, getAlltResearche, getResearch, deleteResearch, } = require('../controllers/researchController');

// Import authentication middleware
const { authMiddleware } = require("../middleware/authMiddleware")


// Protected research routes
router.post("/", authMiddleware, createResearch);
router.get("/", authMiddleware, getAlltResearche);
router.get("/:id", authMiddleware, getResearch);
router.delete("/:id", authMiddleware, deleteResearch )

module.exports = router;