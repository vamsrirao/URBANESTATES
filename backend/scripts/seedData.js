/**
 * seedData.js — UrbanEstates MongoDB Seed Script
 * 
 * Seeds: Admin, Seller, Buyer, Lawyer users + sample properties + map insights
 * Run with: npm run seed
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('../config/db');
const User = require('../models/User');
const Property = require('../models/Property');
const MapInsight = require('../models/MapInsight');

const PROPERTY_IMAGES = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
];

const seedUsers = [
    { name: 'Admin User', email: 'admin@urbanestates.com', password: 'Admin@123', role: 'Admin' },
    { name: 'John Seller', email: 'seller@urbanestates.com', password: 'Seller@123', role: 'Seller' },
    { name: 'Alice Buyer', email: 'buyer@urbanestates.com', password: 'Buyer@123', role: 'Buyer' },
    { name: 'Priya Agent', email: 'agent@urbanestates.com', password: 'Agent@123', role: 'Agent' },
    { name: 'Ravi Lawyer', email: 'lawyer@urbanestates.com', password: 'Lawyer@123', role: 'Lawyer' }
];

const getProperties = (sellerId) => [
    {
        title: 'Luxury Villa in Banjara Hills',
        description: 'Stunning 4BHK luxury villa with private pool, landscaped garden, and premium finishes in the heart of Banjara Hills.',
        price: 85000000,
        location: { address: 'Road No 12, Banjara Hills', city: 'Hyderabad', lat: 17.4156, lng: 78.4347 },
        features: { bedrooms: 4, bathrooms: 5, sqft: 4500, propertyType: 'Villa' },
        tags: ['Premium', 'Verified', 'Pool', 'Gated Community'],
        images: [PROPERTY_IMAGES[0], PROPERTY_IMAGES[1]],
        sellerId,
        status: 'Available'
    },
    {
        title: 'Modern 3BHK Apartment in Hitech City',
        description: 'Spacious 3BHK apartment with panoramic city views, modular kitchen, and covered parking in the IT corridor.',
        price: 15000000,
        location: { address: 'Mindspace Road, Hitech City', city: 'Hyderabad', lat: 17.4435, lng: 78.3772 },
        features: { bedrooms: 3, bathrooms: 3, sqft: 1800, propertyType: 'Apartment' },
        tags: ['IT Corridor', 'Metro Access', 'Verified'],
        images: [PROPERTY_IMAGES[4], PROPERTY_IMAGES[5]],
        sellerId,
        status: 'Available'
    },
    {
        title: 'Prime Commercial Plot in Gachibowli',
        description: 'Corner plot in a high-footfall commercial zone, ideal for retail or office development.',
        price: 32000000,
        location: { address: 'Financial District, Gachibowli', city: 'Hyderabad', lat: 17.4401, lng: 78.3489 },
        features: { bedrooms: 0, bathrooms: 0, sqft: 3200, propertyType: 'Plot' },
        tags: ['Commercial', 'Prime Location', 'RERA Approved'],
        images: [PROPERTY_IMAGES[2]],
        sellerId,
        status: 'Available'
    },
    {
        title: 'Cozy 2BHK in Kondapur',
        description: 'Affordable 2BHK apartment near major tech parks. Ready to move in with all amenities.',
        price: 7500000,
        location: { address: 'Kondapur Main Road, Kondapur', city: 'Hyderabad', lat: 17.4600, lng: 78.3590 },
        features: { bedrooms: 2, bathrooms: 2, sqft: 1100, propertyType: 'Apartment' },
        tags: ['Affordable', 'Ready to Move', 'Near Tech Parks'],
        images: [PROPERTY_IMAGES[3]],
        sellerId,
        status: 'Available'
    }
];

const INSIGHT_CENTERS = [
    { name: 'Hitech City', lat: 17.4435, lng: 78.3772 },
    { name: 'Madhapur', lat: 17.4483, lng: 78.3915 },
    { name: 'Gachibowli', lat: 17.4401, lng: 78.3489 },
    { name: 'Banjara Hills', lat: 17.4156, lng: 78.4347 },
    { name: 'Kukatpally', lat: 17.4849, lng: 78.4023 }
];

const generateInsightCluster = (type, count, titlePrefix, spread = 0.04) => {
    return Array.from({ length: count }, () => {
        const center = INSIGHT_CENTERS[Math.floor(Math.random() * INSIGHT_CENTERS.length)];
        const score = Math.floor(Math.random() * 50) + 50;
        const severity = score > 80 ? 'high' : score > 65 ? 'medium' : 'low';
        return {
            type,
            title: `${titlePrefix} near ${center.name}`,
            severity,
            city: 'Hyderabad',
            coordinates: {
                lat: center.lat + (Math.random() - 0.5) * spread,
                lng: center.lng + (Math.random() - 0.5) * spread
            },
            dataScore: score
        };
    });
};

// ─── Amenity Seed Data with Categories ──────────────────────────────────────
const AMENITY_TEMPLATES = [
    { category: 'hospital', titles: ['Apollo Hospital', 'Care Hospitals', 'Yashoda Hospital', 'Continental Clinic', 'KIMS Medical Center'] },
    { category: 'school', titles: ['Delhi Public School', 'Oakridge International', 'Chirec Public School', 'Glendale Academy', 'Silver Oaks School'] },
    { category: 'mall', titles: ['Inorbit Mall', 'Forum Sujana Mall', 'GVK One Mall', 'Sarath City Capital', 'Manjeera Mall'] },
    { category: 'park', titles: ['KBR National Park', 'Botanical Garden', 'Nehru Zoological Park', 'Durgam Cheruvu Park', 'Necklace Road Park'] },
    { category: 'restaurant', titles: ['Paradise Restaurant', 'Ohris Restaurant', 'Fusion 9 Dining', 'Pista House', 'Bawarchi Restaurant'] },
    { category: 'bank', titles: ['HDFC Bank ATM', 'ICICI Branch', 'SBI Main Branch', 'Axis Bank', 'Kotak Mahindra Bank'] },
    { category: 'gym', titles: ['Gold\'s Gym', 'Snap Fitness', 'Cult Fitness Studio', 'Anytime Fitness', 'F45 Training'] },
    { category: 'pharmacy', titles: ['Apollo Pharmacy', 'MedPlus', 'Wellness Forever', 'Netmeds Store', 'Practo Health'] }
];

const generateAmenitySeeds = () => {
    const seeds = [];
    AMENITY_TEMPLATES.forEach(template => {
        template.titles.forEach(title => {
            const center = INSIGHT_CENTERS[Math.floor(Math.random() * INSIGHT_CENTERS.length)];
            const score = Math.floor(Math.random() * 50) + 50;
            seeds.push({
                type: 'amenities',
                title: `${title} near ${center.name}`,
                description: `${template.category.charAt(0).toUpperCase() + template.category.slice(1)} facility serving the ${center.name} area`,
                category: template.category,
                severity: score > 80 ? 'high' : score > 65 ? 'medium' : 'low',
                city: 'Hyderabad',
                coordinates: {
                    lat: center.lat + (Math.random() - 0.5) * 0.05,
                    lng: center.lng + (Math.random() - 0.5) * 0.05
                },
                dataScore: score
            });
        });
    });
    return seeds;
};

// ─── Development Seed Data with Subtypes & Timelines ────────────────────────
const DEVELOPMENT_TEMPLATES = [
    { subtype: 'tech', titles: ['TechPark Omega', 'Digital Innovation Hub', 'CyberSpace IT Park', 'InfoEdge Campus', 'StartupCity Towers'] },
    { subtype: 'residential', titles: ['Green Meadows Villas', 'SkyView Luxury Apartments', 'Heritage Heights', 'Palm Springs Residency', 'Urban Nest Complex'] },
    { subtype: 'commercial', titles: ['Business Bay Plaza', 'Commerce Hub Tower', 'Trade Center Complex', 'Empire Business Park', 'Metro Square Mall'] },
    { subtype: 'transport', titles: ['Metro Line Extension', 'Outer Ring Road Flyover', 'BRT Corridor Phase 2', 'New Railway Station', 'Airport Expressway Link'] }
];

const COMPLETION_YEARS = ['2027 Q1', '2027 Q3', '2028 Q2', '2028 Q4', '2029 Q1', '2029 Q3'];

const generateDevelopmentSeeds = () => {
    const seeds = [];
    DEVELOPMENT_TEMPLATES.forEach(template => {
        template.titles.forEach(title => {
            const center = INSIGHT_CENTERS[Math.floor(Math.random() * INSIGHT_CENTERS.length)];
            const score = Math.floor(Math.random() * 40) + 60;
            seeds.push({
                type: 'development',
                title: `${title} near ${center.name}`,
                description: `${template.subtype.charAt(0).toUpperCase() + template.subtype.slice(1)} development project in the ${center.name} zone`,
                subtype: template.subtype,
                expectedCompletion: COMPLETION_YEARS[Math.floor(Math.random() * COMPLETION_YEARS.length)],
                severity: score > 80 ? 'high' : score > 65 ? 'medium' : 'low',
                city: 'Hyderabad',
                coordinates: {
                    lat: center.lat + (Math.random() - 0.5) * 0.05,
                    lng: center.lng + (Math.random() - 0.5) * 0.05
                },
                dataScore: score
            });
        });
    });
    return seeds;
};

const seedInsights = [
    ...generateInsightCluster('traffic', 100, 'Traffic Congestion'),
    ...generateInsightCluster('price-trend', 60, 'Property Value Surge', 0.1),
    ...generateInsightCluster('aqi', 50, 'Air Quality Sensor', 0.08),
    ...generateAmenitySeeds(),
    ...generateDevelopmentSeeds(),
    {
        type: 'flood', title: 'Hussain Sagar Flood Risk', severity: 'high',
        coordinates: { lat: 17.425, lng: 78.474 },
        city: 'Hyderabad',
        geojson: {
            type: 'Polygon',
            coordinates: [[[78.468, 17.415], [78.480, 17.415], [78.482, 17.435], [78.470, 17.430], [78.468, 17.415]]]
        }
    },
    {
        type: 'flood', title: 'Musi River Floodplain', severity: 'high',
        coordinates: { lat: 17.381, lng: 78.480 },
        city: 'Hyderabad',
        geojson: {
            type: 'Polygon',
            coordinates: [[[78.460, 17.375], [78.490, 17.370], [78.495, 17.380], [78.465, 17.385], [78.460, 17.375]]]
        }
    }
];

const seed = async () => {
    try {
        await connectDB();
        console.log('🌱 Starting seed...');

        // Clear existing data
        await Promise.all([
            User.deleteMany(),
            Property.deleteMany(),
            MapInsight.deleteMany()
        ]);
        console.log('🗑️  Cleared existing collections');

        // Create users (using create instead of insertMany to trigger password hash pre-save hook)
        const createdUsers = await User.create(seedUsers);
        const seller = createdUsers.find(u => u.role === 'Seller');
        console.log(`👤 Created ${createdUsers.length} users`);

        // Create properties
        const properties = getProperties(seller._id);
        await Property.insertMany(properties);
        console.log(`🏠 Created ${properties.length} properties`);

        // Create map insights
        await MapInsight.insertMany(seedInsights);
        console.log(`🗺️  Created ${seedInsights.length} map insights`);

        console.log('\n✅ Seed completed successfully!');
        console.log('\n📋 Demo Credentials:');
        console.log('   Admin:  admin@urbanestates.com / Admin@123');
        console.log('   Seller: seller@urbanestates.com / Seller@123');
        console.log('   Buyer:  buyer@urbanestates.com / Buyer@123');
        console.log('   Lawyer: lawyer@urbanestates.com / Lawyer@123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed failed:', error.message);
        process.exit(1);
    }
};

seed();
