const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 },
        location: {
            address: { type: String, required: true, trim: true },
            city: { type: String, required: true, default: 'Hyderabad', trim: true },
            lat: { type: Number, required: true },
            lng: { type: Number, required: true }
        },
        features: {
            bedrooms: { type: Number, required: true, min: 0 },
            bathrooms: { type: Number, required: true, min: 0 },
            sqft: { type: Number, required: true, min: 0 },
            propertyType: {
                type: String,
                enum: ['Apartment', 'Villa', 'Plot', 'Commercial'],
                required: true
            }
        },
        tags: [{ type: String, trim: true }],
        images: [{ type: String }], // Cloud URLs only (Unsplash / Cloudinary)
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: String,
            enum: ['Available', 'Sold', 'Pending'],
            default: 'Available'
        }
    },
    { timestamps: true }  // auto-manages createdAt + updatedAt
);

// Indexes for search performance
propertySchema.index({ 'location.city': 1, price: 1 });
propertySchema.index({ 'features.propertyType': 1 });
propertySchema.index({ 'features.bedrooms': 1 });
propertySchema.index({ status: 1 });
propertySchema.index({ sellerId: 1 });

module.exports = mongoose.model('Property', propertySchema);
