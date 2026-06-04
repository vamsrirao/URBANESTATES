const insightService = require('../services/insightService');

// @desc    Get map insights by Layer Type 
// @route   GET /api/insights/:type
// @access  Public
const getInsights = async (req, res) => {
    try {
        const { type } = req.params;
        const validTypes = ['flood', 'traffic', 'development', 'price-trend', 'aqi', 'amenities'];
        
        if (!validTypes.includes(type)) {
            return res.status(400).json({ message: 'Invalid insight type requested' });
        }

        const filters = {
            city: req.query.city,
            region: req.query.region,
            severity: req.query.severity
        };

        const result = await insightService.getInsightsByType(type, filters);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getInsights
};
