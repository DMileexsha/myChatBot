// geminiService.js
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function getGeminiResponse(userMessage) {
  try {
    console.log("🔍 Sending to Gemini:", userMessage);

    const model = genAI.getGenerativeModel({
      model: 'models/gemini-2.0-flash', // ✅ Use your exact model name
    });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: userMessage }] }],
    });

    const response = result.response;
    const text = response.text();

    console.log("✅ Gemini replied:", text);
    return text;
  } catch (error) {
    console.error("❌ Gemini Error:", error.message || error);
    return "Sorry, I couldn't get a response from Gemini right now.";
  }
}
