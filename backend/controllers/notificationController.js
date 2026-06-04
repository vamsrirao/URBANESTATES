const Notification = require('../models/Notification');
const User = require('../models/User');

// @desc    Create a notification (for lawyer consultation booking)
// @route   POST /api/notifications
// @access  Private
const createNotification = async (req, res) => {
    try {
        const {
            recipientEmail,
            senderName,
            senderEmail,
            senderRole,
            type,
            title,
            message,
            bookingRef,
            consultationDate,
            consultationTime,
            consultationQuery
        } = req.body;

        if (!recipientEmail || !title || !message || !senderName) {
            return res.status(400).json({ message: 'recipientEmail, senderName, title, and message are required' });
        }

        // Prevent duplicate notification for the same booking
        if (bookingRef) {
            const existing = await Notification.findOne({ bookingRef });
            if (existing) {
                return res.status(409).json({ message: 'Notification for this booking already exists' });
            }
        }

        // Try to find recipient User by email for linking
        const recipientUser = await User.findOne({ email: recipientEmail.toLowerCase() });

        const notification = await Notification.create({
            recipientUserId: recipientUser?._id || null,
            recipientEmail: recipientEmail.toLowerCase(),
            senderUserId: req.user?._id || null,
            senderName,
            senderEmail: senderEmail || req.user?.email,
            senderRole: senderRole || req.user?.role,
            type: type || 'CONSULTATION_BOOKED',
            title,
            message,
            bookingRef,
            consultationDate,
            consultationTime,
            consultationQuery
        });

        res.status(201).json(notification);
    } catch (error) {
        console.error('Create notification error:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get current user's notifications
// @route   GET /api/notifications/my
// @access  Private
const getMyNotifications = async (req, res) => {
    try {
        const userEmail = req.user.email.toLowerCase();

        // Find by userId OR by email (supports both linked and unlinked notifications)
        const notifications = await Notification.find({
            $or: [
                { recipientUserId: req.user._id },
                { recipientEmail: userEmail }
            ]
        }).sort({ createdAt: -1 }).limit(50);

        const unreadCount = notifications.filter(n => !n.isRead).length;

        res.json({ notifications, unreadCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Mark a single notification as read
// @route   PATCH /api/notifications/:id/read
// @access  Private
const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        // Security: only the recipient can mark as read
        const userEmail = req.user.email.toLowerCase();
        const isRecipient =
            (notification.recipientUserId && notification.recipientUserId.toString() === req.user._id.toString()) ||
            notification.recipientEmail === userEmail;

        if (!isRecipient) {
            return res.status(403).json({ message: 'Not authorized to modify this notification' });
        }

        notification.isRead = true;
        await notification.save();
        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Mark all notifications as read for current user
// @route   PATCH /api/notifications/read-all
// @access  Private
const markAllRead = async (req, res) => {
    try {
        const userEmail = req.user.email.toLowerCase();

        await Notification.updateMany(
            {
                $or: [
                    { recipientUserId: req.user._id },
                    { recipientEmail: userEmail }
                ],
                isRead: false
            },
            { isRead: true }
        );

        res.json({ message: 'All notifications marked as read' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createNotification,
    getMyNotifications,
    markAsRead,
    markAllRead
};
