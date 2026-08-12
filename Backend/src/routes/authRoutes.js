const express = require('express');
const router = express.Router();


const { register, login, getCurrentUser } = require('../controllers/authController');

// ==================== Importing Middleware ====================
const { authMiddleware } = require("../middleware/authMiddleware")
// const { get } = require('../app');


router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getCurrentUser);








module.exports = router;