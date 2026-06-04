const paymentService = require('../services/paymentService');

// @desc    Create a payment for a booking
// @route   POST /api/payments
// @access  Private
const createPayment = async (req, res) => {
    try {
        const payment = await paymentService.createPayment(req.body);
        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get payment by booking ID
// @route   GET /api/payments/booking/:bookingId
// @access  Private
const getPaymentByBooking = async (req, res) => {
    try {
        const payment = await paymentService.getPaymentByBooking(req.params.bookingId);
        if (!payment) return res.status(404).json({ message: 'Payment not found for this booking' });
        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get payment by ID
// @route   GET /api/payments/:id
// @access  Private
const getPaymentById = async (req, res) => {
    try {
        const payment = await paymentService.getPaymentById(req.params.id);
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update payment status
// @route   PATCH /api/payments/:id/status
// @access  Private (Admin)
const updatePaymentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!status) return res.status(400).json({ message: 'Status is required' });
        const payment = await paymentService.updatePaymentStatus(req.params.id, status);
        res.json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all payments (Admin)
// @route   GET /api/payments
// @access  Private (Admin)
const getAllPayments = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const result = await paymentService.getAllPayments(page, limit);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPayment,
    getPaymentByBooking,
    getPaymentById,
    updatePaymentStatus,
    getAllPayments
};
