const express = require("express");

const router = express.Router();

const { generateResponse } = require("../controllers/aiController");

const {authMiddleware} = require("../middleware/authMiddleware");

router.post("/generate", authMiddleware, generateResponse);

module.exports = router;