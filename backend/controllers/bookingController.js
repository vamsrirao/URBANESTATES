const bookingService = require('../services/bookingService');

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
    try {
        const booking = await bookingService.createBooking(req.user._id, req.body);
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get logged-in user's bookings
// @route   GET /api/bookings/my
// @access  Private
const getMyBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getBookingsByUser(req.user._id);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all bookings (paginated)
// @route   GET /api/bookings
// @access  Private (Admin)
const getAllBookings = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const result = await bookingService.getAllBookings(page, limit);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res) => {
    try {
        const booking = await bookingService.getBookingById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update booking status
// @route   PATCH /api/bookings/:id/status
// @access  Private (Admin/Agent)
const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!status) return res.status(400).json({ message: 'Status is required' });
        const booking = await bookingService.updateBookingStatus(req.params.id, status);
        res.json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Cancel a booking (user cancels own)
// @route   PATCH /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res) => {
    try {
        const booking = await bookingService.cancelBooking(req.params.id, req.user._id);
        res.json({ message: 'Booking cancelled successfully', booking });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createBooking,
    getMyBookings,
    getAllBookings,
    getBookingById,
    updateBookingStatus,
    cancelBooking
};
