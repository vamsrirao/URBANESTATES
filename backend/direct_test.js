require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function verifyAPI() {
    try {
        console.log("Testing generation with gemini-2.5-flash...");
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ role: 'user', parts: [{ text: "tell me a quick 1 sentence joke" }]}],
            config: {
                systemInstruction: "You are a bot"
            }
        });
        console.log("SUCCESS. Response:", response.text);
    } catch (error) {
        console.error("FAILURE. Error object:", error);
    }
}
verifyAPI();
