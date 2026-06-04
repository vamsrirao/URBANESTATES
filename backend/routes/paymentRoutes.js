const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    createPayment,
    getPaymentByBooking,
    getPaymentById,
    updatePaymentStatus,
    getAllPayments
} = require('../controllers/paymentController');

// Admin-only
router.get('/', protect, authorize('Admin'), getAllPayments);

// Payment CRUD (authenticated)
router.post('/', protect, createPayment);
router.get('/booking/:bookingId', protect, getPaymentByBooking);
router.get('/:id', protect, getPaymentById);
router.patch('/:id/status', protect, authorize('Admin', 'Agent'), updatePaymentStatus);

module.exports = router;
