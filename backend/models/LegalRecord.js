const mongoose = require('mongoose');

const legalRecordSchema = new mongoose.Schema(
    {
        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property',
            required: true
        },
        lawyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: String,
            enum: ['PENDING_VERIFICATION', 'VERIFIED', 'REJECTED'],
            default: 'PENDING_VERIFICATION'
        },
        documentUrls: {
            type: [String],
            default: []
        },
        notes: {
            type: String,
            trim: true,
            default: ''
        },
        rejectionReason: {
            type: String,
            trim: true,
            default: null
        }
    },
    { timestamps: true }
);

// Indexes for efficient lookups
legalRecordSchema.index({ propertyId: 1 });
legalRecordSchema.index({ lawyerId: 1 });
legalRecordSchema.index({ status: 1 });

module.exports = mongoose.model('LegalRecord', legalRecordSchema);
