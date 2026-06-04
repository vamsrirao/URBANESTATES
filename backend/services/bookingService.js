const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

/**
 * Create a new booking
 */
const createBooking = async (userId, data) => {
    const { propertyId, visitDate, notes } = data;

    // Prevent duplicate pending/confirmed booking for same user+property
    const existing = await Booking.findOne({
        userId,
        propertyId,
        status: { $in: ['PENDING', 'CONFIRMED'] }
    });
    if (existing) {
        throw new Error('You already have an active booking for this property.');
    }

    const booking = await Booking.create({ userId, propertyId, visitDate, notes });
    return booking;
};

/**
 * Get all bookings for a user (with property details)
 */
const getBookingsByUser = async (userId) => {
    return await Booking.find({ userId })
        .populate('propertyId', 'title location.address location.city price images features')
        .sort({ createdAt: -1 });
};

/**
 * Get all bookings — Admin view
 */
const getAllBookings = async (page = 1, limit = 20) => {
    const skip = (page - 1) * limit;
    const [bookings, total] = await Promise.all([
        Booking.find()
            .populate('userId', 'name email phone')
            .populate('propertyId', 'title location.address price')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Booking.countDocuments()
    ]);
    return { bookings, total, page, pages: Math.ceil(total / limit) };
};

/**
 * Get single booking by ID
 */
const getBookingById = async (bookingId) => {
    return await Booking.findById(bookingId)
        .populate('userId', 'name email phone')
        .populate('propertyId', 'title location price images features');
};

/**
 * Update booking status — Admin/Agent
 */
const updateBookingStatus = async (bookingId, status) => {
    const allowedStatuses = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];
    if (!allowedStatuses.includes(status)) {
        throw new Error(`Invalid status. Allowed: ${allowedStatuses.join(', ')}`);
    }
    const booking = await Booking.findByIdAndUpdate(
        bookingId,
        { status },
        { new: true, runValidators: true }
    );
    if (!booking) throw new Error('Booking not found');
    return booking;
};

/**
 * Cancel a booking — User (own booking only)
 */
const cancelBooking = async (bookingId, userId) => {
    const booking = await Booking.findOne({ _id: bookingId, userId });
    if (!booking) throw new Error('Booking not found or unauthorized');
    if (booking.status === 'COMPLETED') {
        throw new Error('Cannot cancel a completed booking');
    }
    booking.status = 'CANCELLED';
    await booking.save();

    // If there's a payment, mark it for refund
    await Payment.findOneAndUpdate(
        { bookingId, status: 'COMPLETED' },
        { status: 'REFUNDED' }
    );

    return booking;
};

/**
 * Update payment status on a booking
 */
const updateBookingPaymentStatus = async (bookingId, paymentStatus) => {
    return await Booking.findByIdAndUpdate(
        bookingId,
        { paymentStatus },
        { new: true }
    );
};

module.exports = {
    createBooking,
    getBookingsByUser,
    getAllBookings,
    getBookingById,
    updateBookingStatus,
    cancelBooking,
    updateBookingPaymentStatus
};
