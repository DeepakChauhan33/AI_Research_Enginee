const express = require("express");

const router = express.Router();


const { createResearch, getResearche } = require('../controllers/researchController');

// ==================== Importing Middleware ====================

const { authMiddleware } = require("../middleware/authMiddleware")


router.post("/", authMiddleware, createResearch);

router.get("/", authMiddleware, getResearche)


module.exports = router;