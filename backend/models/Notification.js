const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
    {
        recipientUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false // May not have a matching User in DB yet
        },
        recipientEmail: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        senderUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },
        senderName: {
            type: String,
            required: true,
            trim: true
        },
        senderEmail: {
            type: String,
            trim: true
        },
        senderRole: {
            type: String,
            trim: true
        },
        type: {
            type: String,
            enum: ['CONSULTATION_BOOKED', 'CONSULTATION_CANCELLED', 'GENERAL'],
            default: 'GENERAL'
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        message: {
            type: String,
            required: true,
            trim: true
        },
        bookingRef: {
            type: String,
            trim: true
        },
        consultationDate: {
            type: String,
            trim: true
        },
        consultationTime: {
            type: String,
            trim: true
        },
        consultationQuery: {
            type: String,
            trim: true
        },
        isRead: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

// Indexes for efficient queries
notificationSchema.index({ recipientEmail: 1, isRead: 1 });
notificationSchema.index({ recipientUserId: 1, isRead: 1 });
notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ bookingRef: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('Notification', notificationSchema);
