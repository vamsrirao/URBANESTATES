const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    createNotification,
    getMyNotifications,
    markAsRead,
    markAllRead
} = require('../controllers/notificationController');

// All routes require authentication
router.post('/', protect, createNotification);
router.get('/my', protect, getMyNotifications);
router.patch('/read-all', protect, markAllRead);
router.patch('/:id/read', protect, markAsRead);

module.exports = router;
