const MapInsight = require('../models/MapInsight');

const insightService = {
    // Fetch insights based on type and filters
    async getInsightsByType(type, filters = {}) {
        const query = { type };

        if (filters.city) {
            query.city = { $regex: new RegExp(filters.city, 'i') };
        }
        
        if (filters.region) {
            query.region = { $regex: new RegExp(filters.region, 'i') };
        }

        if (filters.severity) {
            query.severity = filters.severity;
        }

        const insights = await MapInsight.find(query).sort({ timestamp: -1 });
        
        // Optimize formatting based on insight type for Leaflet
        return this.formatForLeaflet(type, insights);
    },

    // Optional: Format the data so Leaflet can consume it more easily
    formatForLeaflet(type, insights) {
        switch (type) {
            case 'price-trend':
            case 'aqi':
            case 'traffic':
                // Heatmaps expect an array of coords [lat, lng, intensity] where intensity is typically 0.0 - 1.0
                return {
                    format: 'heatmap',
                    data: insights.map(i => ({
                        lat: i.coordinates.lat,
                        lng: i.coordinates.lng,
                        intensity: i.dataScore ? (i.dataScore / 100) : (i.severity === 'high' ? 1.0 : i.severity === 'medium' ? 0.6 : 0.3),
                        metadata: { title: i.title, description: i.description }
                    }))
                };
            case 'flood':
                // Flood Zones expect GeoJSON polygons natively mapped
                return {
                    format: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: insights.filter(i => i.geojson).map(i => ({
                            type: 'Feature',
                            geometry: i.geojson, // Mongoose Mixed Type stores arbitrary JSON natively
                            properties: {
                                title: i.title,
                                severity: i.severity,
                                description: i.description
                            }
                        }))
                    }
                };
            case 'amenities':
                // Amenity markers with category information
                return {
                    format: 'markers',
                    data: insights.map(i => ({
                        lat: i.coordinates.lat,
                        lng: i.coordinates.lng,
                        title: i.title,
                        description: i.description,
                        severity: i.severity,
                        category: i.category || null
                    }))
                };
            case 'development':
                // Development markers with project details
                return {
                    format: 'markers',
                    data: insights.map(i => ({
                        lat: i.coordinates.lat,
                        lng: i.coordinates.lng,
                        title: i.title,
                        description: i.description,
                        severity: i.severity,
                        subtype: i.subtype || null,
                        expectedCompletion: i.expectedCompletion || null
                    }))
                };
            default:
                // Fallback markers
                return {
                    format: 'markers',
                    data: insights.map(i => ({
                        lat: i.coordinates.lat,
                        lng: i.coordinates.lng,
                        title: i.title,
                        description: i.description,
                        severity: i.severity
                    }))
                };
        }
    }
};

module.exports = insightService;
