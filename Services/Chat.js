
// chat.js
import express from 'express';
import  getGeminiResponse  from './geminiService.js';

const router = express.Router();

router.post('/gemini-reply', async (req, res) => {
  const { message } = req.body;
  console.log('📩 Message received from frontend:', message);

  try {
    const reply = await getGeminiResponse(message);
    res.json({ reply });
  } catch (error) {
    console.error('❌ Error in /api/gemini-reply route:', error.message);
    res.status(500).json({ error: 'Gemini API failed' });
  }
});

export default router;
