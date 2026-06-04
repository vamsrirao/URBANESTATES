const Payment = require('../models/Payment');
const bookingService = require('./bookingService');

/**
 * Create a payment for a booking
 */
const createPayment = async (data) => {
    const { bookingId, amount, currency = 'INR', method = 'STRIPE', stripePaymentId } = data;

    // Check booking exists
    const booking = await bookingService.getBookingById(bookingId);
    if (!booking) throw new Error('Booking not found');

    // Prevent duplicate payment
    const existingPayment = await Payment.findOne({ bookingId });
    if (existingPayment) throw new Error('Payment already exists for this booking');

    const payment = await Payment.create({
        bookingId,
        amount,
        currency,
        method,
        stripePaymentId: stripePaymentId || null,
        status: 'PENDING'
    });

    return payment;
};

/**
 * Get payment by booking ID
 */
const getPaymentByBooking = async (bookingId) => {
    return await Payment.findOne({ bookingId }).populate('bookingId');
};

/**
 * Get payment by ID
 */
const getPaymentById = async (paymentId) => {
    return await Payment.findById(paymentId).populate('bookingId');
};

/**
 * Update payment status (Admin / webhook)
 */
const updatePaymentStatus = async (paymentId, status) => {
    const allowedStatuses = ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'];
    if (!allowedStatuses.includes(status)) {
        throw new Error(`Invalid status. Allowed: ${allowedStatuses.join(', ')}`);
    }

    const payment = await Payment.findByIdAndUpdate(
        paymentId,
        { status },
        { new: true, runValidators: true }
    );
    if (!payment) throw new Error('Payment not found');

    // Sync booking paymentStatus
    if (status === 'COMPLETED') {
        await bookingService.updateBookingPaymentStatus(payment.bookingId, 'PAID');
    } else if (status === 'REFUNDED') {
        await bookingService.updateBookingPaymentStatus(payment.bookingId, 'REFUNDED');
    }

    return payment;
};

/**
 * Get all payments — Admin
 */
const getAllPayments = async (page = 1, limit = 20) => {
    const skip = (page - 1) * limit;
    const [payments, total] = await Promise.all([
        Payment.find()
            .populate({ path: 'bookingId', populate: { path: 'userId', select: 'name email' } })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Payment.countDocuments()
    ]);
    return { payments, total, page, pages: Math.ceil(total / limit) };
};

module.exports = {
    createPayment,
    getPaymentByBooking,
    getPaymentById,
    updatePaymentStatus,
    getAllPayments
};
