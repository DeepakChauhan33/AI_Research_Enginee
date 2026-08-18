const express = require('express');
const router = express.Router();

// Import controllers
const { register, login, getCurrentUser, logout } = require('../controllers/authController');

// Import authentication middleware
const { authMiddleware } = require("../middleware/authMiddleware")


// Public routes
router.post('/register', register);
router.post('/login', login);

/** 
 Logout: Frontend calls this route, then removes the stored JWT/token
 and clears the user's authentication state.
**/
router.post('/logout', logout);


router.get('/me', authMiddleware, getCurrentUser);








module.exports = router;