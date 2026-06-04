const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    createBooking,
    getMyBookings,
    getAllBookings,
    getBookingById,
    updateBookingStatus,
    cancelBooking
} = require('../controllers/bookingController');

// Buyer routes
router.post('/', protect, authorize('Buyer'), createBooking);
router.get('/my', protect, getMyBookings);
router.get('/:id', protect, getBookingById);
router.patch('/:id/cancel', protect, cancelBooking);

// Admin / Agent routes
router.get('/', protect, authorize('Admin', 'Agent'), getAllBookings);
router.patch('/:id/status', protect, authorize('Admin', 'Agent'), updateBookingStatus);

module.exports = router;
