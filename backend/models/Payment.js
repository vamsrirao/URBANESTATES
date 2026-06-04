const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        bookingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking',
            required: true,
            unique: true  // 1:1 relationship with Booking
        },
        amount: {
            type: Number,
            required: true,
            min: 0
        },
        currency: {
            type: String,
            default: 'INR',
            uppercase: true,
            trim: true
        },
        status: {
            type: String,
            enum: ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'],
            default: 'PENDING'
        },
        stripePaymentId: {
            type: String,
            trim: true,
            default: null
        },
        method: {
            type: String,
            enum: ['STRIPE', 'UPI', 'BANK_TRANSFER', 'CASH'],
            default: 'STRIPE'
        }
    },
    { timestamps: true }
);


paymentSchema.index({ status: 1 });

module.exports = mongoose.model('Payment', paymentSchema);
