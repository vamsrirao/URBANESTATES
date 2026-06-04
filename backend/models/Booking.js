const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property',
            required: true
        },
        visitDate: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'],
            default: 'PENDING'
        },
        paymentStatus: {
            type: String,
            enum: ['UNPAID', 'PAID', 'REFUNDED'],
            default: 'UNPAID'
        },
        notes: {
            type: String,
            trim: true
        }
    },
    { timestamps: true }
);

// Compound index for efficient user+property queries
bookingSchema.index({ userId: 1, propertyId: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ visitDate: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
