const propertyService = require('../services/propertyService');

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
const getProperties = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = await propertyService.getAllProperties(page, limit);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Search properties
// @route   GET /api/properties/search
// @access  Public
const searchProperties = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        // Extract filters from query params
        const filters = {
            minPrice: req.query.minPrice,
            maxPrice: req.query.maxPrice,
            city: req.query.city,
            bedrooms: req.query.bedrooms,
            propertyType: req.query.propertyType,
            tags: req.query.tags
        };

        const result = await propertyService.searchProperties(filters, page, limit);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = async (req, res) => {
    try {
        const property = await propertyService.getPropertyById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create a new property
// @route   POST /api/properties
// @access  Private (Seller/Agent)
const createProperty = async (req, res) => {
    try {
        const newProperty = await propertyService.createProperty(req.body, req.user._id);
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create property', error: error.message });
    }
};

module.exports = {
    getProperties,
    searchProperties,
    getPropertyById,
    createProperty
};
