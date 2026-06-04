const mongoose = require('mongoose');

const mapInsightSchema = new mongoose.Schema({
    type: { 
        type: String, 
        enum: ['flood', 'traffic', 'development', 'price-trend', 'aqi', 'amenities'],
        required: true 
    },
    title: { type: String, required: true },
    description: { type: String },
    severity: { 
        type: String, 
        enum: ['low', 'medium', 'high'],
        required: true
    },
    city: { type: String, default: 'Hyderabad' },
    region: { type: String },
    coordinates: {
        lat: { type: Number },
        lng: { type: Number },
        radius: { type: Number, default: 1000 } // radius in meters
    },
    geojson: {
        type: mongoose.Schema.Types.Mixed // For complex polygons like Flood Zones
    },
    dataScore: { type: Number, min: 0, max: 100 }, // 0-100 score for visualization
    category: { type: String },                     // Amenity category (hospital, school, mall, etc.)
    subtype: { type: String },                      // Development subtype (tech, residential, commercial, transport)
    expectedCompletion: { type: String },            // e.g., "2028 Q2"
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MapInsight', mapInsightSchema);
