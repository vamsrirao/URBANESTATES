const express = require('express');
const rateLimit = require('express-rate-limit');
const { registerUser, authUser, verifyEmail, resendOTP, getMe, logoutUser } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Rate limiter specifically for auth endpoints (stricter than global)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 attempts per window per IP
    message: { message: 'Too many attempts, please try again after 15 minutes' },
    standardHeaders: true,
    legacyHeaders: false
});

// Public routes (with rate limiting)
router.post('/register', authLimiter, registerUser);
router.post('/login', authLimiter, authUser);
router.post('/verify-email', authLimiter, verifyEmail);
router.post('/resend-otp', authLimiter, resendOTP);

// Protected routes
router.get('/me', protect, getMe);
router.post('/logout', protect, logoutUser);

module.exports = router;
