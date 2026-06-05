const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { GoogleGenAI } = require('@google/genai');
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const insightRoutes = require('./routes/insightRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const legalRoutes = require('./routes/legalRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

dotenv.config();

// Validate critical environment variables
const criticalEnvVars = ['JWT_SECRET', 'MONGODB_URI'];
const missingVars = criticalEnvVars.filter(v => !process.env[v]);
if (missingVars.length > 0) {
    console.error(`\n❌ CRITICAL STARTUP ERROR: Missing essential environment variables in .env:\n${missingVars.map(v => `   - ${v}`).join('\n')}\n`);
    process.exit(1);
}

// Connect to MongoDB
connectDB();

const app = express();
app.set('trust proxy', true);
app.get('/api/test-cors', (req, res) => {
    res.json({
        success: true,
        origin: req.headers.origin
    });
});
// Security: HTTP security headers
app.use(helmet());

// Security: Parse cookies for JWT cookie auth
app.use(cookieParser());

// Security: CORS — restrict to frontend origin


app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'https://urbanestates-frontend.onrender.com',
            'http://localhost:5173'
        ];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed'));
        }
    },
    credentials: true
}));

// Body parser with size limit to prevent large payload attacks
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Security: Global rate limiter (100 requests per 15 min)
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { message: 'Too many requests, please try again later' },
    standardHeaders: true,
    legacyHeaders: false
});
app.use('/api', globalLimiter);

// ─── Routes ─────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/insights', insightRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/legal', legalRoutes);
app.use('/api/notifications', notificationRoutes);

// ─── Health Check ────────────────────────────────────────────────────────────
app.get('/api/health', async (req, res) => {
    const mongoose = require('mongoose');
    const state = mongoose.connection.readyState;
    const stateMap = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
    if (state === 1) {
        res.json({ status: 'success', database: 'MongoDB', connection: stateMap[state] });
    } else {
        res.status(500).json({ status: 'error', database: 'MongoDB', connection: stateMap[state] });
    }
});

// ─── Gemini AI Chat ──────────────────────────────────────────────────────────
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `You are an intelligent real estate assistant for a platform called UrbanEstates, based in Hyderabad, India.

You help users with:
* Property search and suggestions
* Buying/selling guidance
* Legal verification and lawyer assistance
* Booking property visits
* Platform navigation

IMPORTANT: You MUST respond with valid JSON in the following format depending on the query type:

1. For property search queries (e.g. "2BHK under 50L", "villas in Madhapur"):
{
  "type": "properties",
  "title": "Brief description of results",
  "properties": [
    {
      "title": "Property Name",
      "price": 5000000,
      "location": "Area, City",
      "beds": 2,
      "baths": 2,
      "sqft": 1200,
      "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "tags": ["Verified", "Premium"],
      "id": null
    }
  ]
}

2. For informational queries (e.g. "how to book a visit", "legal process"):
{
  "type": "info",
  "title": "Topic Title",
  "points": [
    "Step or point 1",
    "Step or point 2",
    "Step or point 3"
  ]
}

3. For general conversation:
{
  "type": "text",
  "content": "Your response text here"
}

Rules:
- Always return ONLY valid JSON, no markdown fences, no extra text
- For property searches, provide 2-4 realistic Hyderabad properties with appropriate prices in INR
- Use real Hyderabad locations (Hitech City, Gachibowli, Madhapur, Kondapur, Banjara Hills, etc.)
- Use these Unsplash images for properties:
  * "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
  * "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800"
  * "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
  * "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800"
  * "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"
  * "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
- For info queries, provide 3-6 clear, actionable points
- If the question is unrelated to real estate, politely refuse using type "text"
- Prices should be realistic for Hyderabad market (e.g., 2BHK: 40-80L, 3BHK: 80L-2Cr, Villas: 1.5-10Cr)`;

app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.json({
                text: JSON.stringify({
                    type: "text",
                    content: "GEMINI_API_KEY is missing in backend/.env. Please add it to enable the AI."
                })
            });
        }

        const formattedHistory = messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
                contents: formattedHistory,
                generationConfig: { temperature: 0.7 }
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.warn('Gemini API Warning/Error:', data.error?.message);
            // Graceful fallback for API limits (503 overloaded, 429 quota, etc)
            return res.json({
                text: JSON.stringify({
                    type: "text",
                    content: `I'm currently experiencing high traffic or my API quota is exhausted. (${data.error?.status || 'API Error'}). Please try again later or check your API key.`
                })
            });
        }

        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!aiText) throw new Error('Invalid response format from AI');

        res.json({ text: aiText });
    } catch (error) {
        console.error('Gemini Request Error:', error.message);
        res.json({
            text: JSON.stringify({
                type: "text",
                content: "I'm having trouble connecting to my AI service right now. Please try again soon."
            })
        });
    }
});

// Serve frontend static build in production

// ─── Start Server ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ UrbanEstates Server running on http://localhost:${PORT}`);
    console.log(`📦 Database: MongoDB (mongoose)`);
    console.log(`🚀 Environment: ${process.env.NODE_ENV || 'development'}`);
});
