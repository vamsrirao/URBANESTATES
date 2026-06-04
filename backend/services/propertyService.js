const Property = require('../models/Property');

const propertyService = {
    async getAllProperties(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const properties = await Property.find()
            .populate('sellerId', 'name email phone profileImage')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
            
        const total = await Property.countDocuments();
        return {
            properties,
            total,
            page,
            pages: Math.ceil(total / limit)
        };
    },

    async getPropertyById(id) {
        return await Property.findById(id).populate('sellerId', 'name email phone profileImage');
    },

    async createProperty(propertyData, sellerId) {
        return await Property.create({
            ...propertyData,
            sellerId
        });
    },

    async searchProperties(filters, page = 1, limit = 10) {
        const query = {};

        // Filtering logic
        if (filters.minPrice || filters.maxPrice) {
            query.price = {};
            if (filters.minPrice) query.price.$gte = Number(filters.minPrice);
            if (filters.maxPrice) query.price.$lte = Number(filters.maxPrice);
        }

        if (filters.city) {
            query['location.city'] = { $regex: new RegExp(filters.city, 'i') };
        }

        if (filters.bedrooms) {
            query['features.bedrooms'] = Number(filters.bedrooms);
        }

        if (filters.propertyType) {
            query['features.propertyType'] = filters.propertyType;
        }

        if (filters.tags) {
            // Assume tags come as a comma separated string
            const tagsArray = filters.tags.split(',').map(tag => tag.trim());
            query.tags = { $in: tagsArray };
        }

        // Support GeoSpatial Queries if strict bounds are provided in the future
        // We'll leave structural space here for MapInsight integration

        const skip = (page - 1) * limit;
        const properties = await Property.find(query)
            .populate('sellerId', 'name email profileImage')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Property.countDocuments(query);
        return {
            properties,
            total,
            page,
            pages: Math.ceil(total / limit)
        };
    }
};

module.exports = propertyService;
