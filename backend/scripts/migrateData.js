const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const User = require('../models/User');
const Property = require('../models/Property');
const MapInsight = require('../models/MapInsight');

dotenv.config();

const mockProperties = [
    {
        title: "Luxury Villa in Banjara Hills",
        description: "A beautiful spacious 4BHK luxury villa with pool.",
        price: 85000000,
        location: {
            address: "Road No 12, Banjara Hills",
            city: "Hyderabad",
            lat: 17.4156,
            lng: 78.4347
        },
        features: { bedrooms: 4, bathrooms: 5, sqft: 4500, propertyType: "Villa" },
        tags: ["Premium", "Verified", "Pool"],
        images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"]
    },
    {
        title: "Modern Apartment in Hitech City",
        description: "3BHK apartment with great views.",
        price: 15000000,
        location: {
            address: "Mindspace Road, Hitech City",
            city: "Hyderabad",
            lat: 17.4435,
            lng: 78.3772
        },
        features: { bedrooms: 3, bathrooms: 3, sqft: 1800, propertyType: "Apartment" },
        tags: ["IT Corridor", "Under Construction"],
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"]
    }
];

const migrateData = async () => {
    try {
        await connectDB();
        
        await User.deleteMany();
        await Property.deleteMany();
        await MapInsight.deleteMany();

        console.log('Existing DB Cleared');

        // Create dummy Admin and Seller
        const adminUser = await User.create({
            name: "Admin User",
            email: "admin@urbanestates.com",
            password: "password123",
            role: "Admin"
        });

        const sellerUser = await User.create({
            name: "John Seller",
            email: "seller@urbanestates.com",
            password: "password123",
            role: "Seller"
        });

        // Insert Properties
        const propertiesWithSeller = mockProperties.map(p => ({ ...p, sellerId: sellerUser._id }));
        await Property.insertMany(propertiesWithSeller);

        // Map Insights High-Density Seed Data
        const centers = [
            { name: 'Hitech City', lat: 17.4435, lng: 78.3772 },
            { name: 'Madhapur', lat: 17.4483, lng: 78.3915 },
            { name: 'Gachibowli', lat: 17.4401, lng: 78.3489 },
            { name: 'Banjara Hills', lat: 17.4156, lng: 78.4347 },
            { name: 'Kukatpally', lat: 17.4849, lng: 78.4023 }
        ];

        const generateCluster = (type, count, titlePrefix, options = {}) => {
            const data = [];
            for (let i = 0; i < count; i++) {
                const center = centers[Math.floor(Math.random() * centers.length)];
                const spread = options.spread || 0.04;
                const score = Math.floor(Math.random() * 50) + 50; // 50 to 100 for visible intensity
                const severity = score > 80 ? 'high' : score > 65 ? 'medium' : 'low';
                data.push({
                    type,
                    title: `${titlePrefix} near ${center.name}`,
                    severity,
                    city: 'Hyderabad',
                    coordinates: {
                        lat: center.lat + (Math.random() - 0.5) * spread,
                        lng: center.lng + (Math.random() - 0.5) * spread
                    },
                    dataScore: score
                });
            }
            return data;
        };

        const mockInsights = [
            ...generateCluster('traffic', 100, 'Traffic Congestion'),
            ...generateCluster('price-trend', 60, 'Property Value Surge', { spread: 0.1 }),
            ...generateCluster('aqi', 50, 'Air Quality Sensor', { spread: 0.08 }),
            // Amenity seeds with category metadata
            ...['hospital', 'school', 'mall', 'park', 'restaurant'].flatMap(cat => {
                return Array.from({ length: 8 }, () => {
                    const center = centers[Math.floor(Math.random() * centers.length)];
                    const score = Math.floor(Math.random() * 50) + 50;
                    return {
                        type: 'amenities',
                        title: `${cat.charAt(0).toUpperCase() + cat.slice(1)} near ${center.name}`,
                        description: `${cat.charAt(0).toUpperCase() + cat.slice(1)} facility serving the ${center.name} area`,
                        category: cat,
                        severity: score > 80 ? 'high' : score > 65 ? 'medium' : 'low',
                        city: 'Hyderabad',
                        coordinates: { lat: center.lat + (Math.random() - 0.5) * 0.05, lng: center.lng + (Math.random() - 0.5) * 0.05 },
                        dataScore: score
                    };
                });
            }),
            // Development seeds with subtype and timeline
            ...['tech', 'residential', 'commercial', 'transport'].flatMap(sub => {
                const completions = ['2027 Q1', '2027 Q3', '2028 Q2', '2028 Q4', '2029 Q1'];
                return Array.from({ length: 5 }, () => {
                    const center = centers[Math.floor(Math.random() * centers.length)];
                    const score = Math.floor(Math.random() * 40) + 60;
                    return {
                        type: 'development',
                        title: `${sub.charAt(0).toUpperCase() + sub.slice(1)} Project near ${center.name}`,
                        description: `${sub.charAt(0).toUpperCase() + sub.slice(1)} development in the ${center.name} zone`,
                        subtype: sub,
                        expectedCompletion: completions[Math.floor(Math.random() * completions.length)],
                        severity: score > 80 ? 'high' : score > 65 ? 'medium' : 'low',
                        city: 'Hyderabad',
                        coordinates: { lat: center.lat + (Math.random() - 0.5) * 0.05, lng: center.lng + (Math.random() - 0.5) * 0.05 },
                        dataScore: score
                    };
                });
            }),
            {
                type: 'flood', title: 'Hussain Sagar Flood Risk', severity: 'high',
                coordinates: { lat: 17.425, lng: 78.474 },
                geojson: {
                    type: "Polygon",
                    coordinates: [[
                        [78.468, 17.415], [78.480, 17.415], [78.482, 17.435], [78.470, 17.430], [78.468, 17.415]
                    ]]
                }
            },
            {
                type: 'flood', title: 'Musi River Floodplain', severity: 'high',
                coordinates: { lat: 17.381, lng: 78.480 },
                geojson: {
                    type: "Polygon",
                    coordinates: [[
                        [78.460, 17.375], [78.490, 17.370], [78.495, 17.380], [78.465, 17.385], [78.460, 17.375]
                    ]]
                }
            }
        ];
        
        await MapInsight.insertMany(mockInsights);

        console.log('Mock Data Inserted Successfully');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

migrateData();
