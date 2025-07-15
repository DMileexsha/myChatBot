import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';


const ChatPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const mood = location.state?.mood;
  const userMessage = location.state?.userMessage;

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isGeminiTyping, setIsGeminiTyping] = useState(false);

let typingAudio = null;

const playTypingSound = () => {
  typingAudio = new Audio('/sounds/typing.mp3');
  typingAudio.loop = true; 
  typingAudio.volume = 0.3;
  typingAudio.play().catch((err) => console.warn("Sound play error:", err));
};

const stopTypingSound = () => {
  if (typingAudio) {
    typingAudio.pause();
    typingAudio.currentTime = 1;
    typingAudio = null;
  }
};


  //  Gemini response fetch
  const fetchGeminiReply = async (userText) => {
    try {
      setIsGeminiTyping(true);
      playTypingSound();
      

      const res = await axios.post('/api/gemini-reply', { message: userText });
      const reply = res.data.reply;

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    } catch (error) {
      console.error("Gemini error:", error);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Oops! Something went wrong with Gemini.' }]);
    } finally {
      setIsGeminiTyping(false);
      stopTypingSound();
    }
  };

  //  Supportive message generator
  const generateSupportiveMessage = (mood) => {
    switch (mood?.toLowerCase()) {
      case 'sad':
        return "I'm here for you. It's okay to feel sad. Want to talk about it?";
      case 'happy':
        return "Yay! I’m glad you’re feeling happy today! 😊";
      case 'angry':
        return "I hear you. Anger is valid. Let’s take a deep breath together.";
      case 'tired':
        return "You must be exhausted. Want to vent or just take a moment?";
      case 'overwhelmed':
        return "It sounds like a lot is going on. I'm here to help you slow down.";
      case 'neutral':
        return "Thanks for sharing. I'm here for anything you’d like to talk about.";
      default:
        return "I'm here to support you. Tell me more.";
    }
  };

  //  Handle mood & first message
  useEffect(() => {
  const messagesToShow = [];

if (mood) {
  const greeting = generateSupportiveMessage(mood);
  messagesToShow.push({ sender: 'bot', text: greeting });
}


  if (userMessage?.trim()) {
  messagesToShow.push({ sender: 'user', text: userMessage.trim() });
  setMessages(messagesToShow);
  fetchGeminiReply(userMessage.trim());
}else{
  setMessages(messagesToShow);
}



setMessages(messagesToShow);


}, [mood, userMessage]
);



    

  // 📤 Handle message send
  const handleSend = () => {
    if (userInput.trim() === '') return;

    const newMessages = [...messages, { sender: 'user', text: userInput.trim() }];
    setMessages(newMessages);
    fetchGeminiReply(userInput.trim());
    setUserInput('');
  };

  return (
    <div className='w-full h-full p-4 bg-[#f7e9fb] rounded-xl overflow-auto text-white-800 '>
      {/* Mood Display */}
      <div style={{ background: "#eacdf6", padding: "10px", borderRadius: "10px" }}>
        <p>
          Mood: {mood}{" "}
          {mood === 'Sad'
            ? '😢'
            : mood === 'Happy'
            ? '😊'
            : mood === 'Angry'
            ? '😠'
            : mood === 'Tired'
            ? '😴'
            : mood === 'Overwhelmed'
            ? '🤯'
            : mood === 'Neutral'
            ? '😐'
            : ''}
        </p>
        <button
          onClick={() => navigate('/mood')}
          className='text-[#8b5cf6] text-sm px-3 py-1 rounded-full bg-purple-400 hover:bg-purple-300 text-white transition-all ml-145 cursor-pointer mt-0 font-semibold'
        >
          ← Back To Moodboard
        </button>
      </div>

      <div
  style={{
    marginTop: "20px",
    background: "#fff",
    height: "300px",
    borderRadius: "10px",
    padding: "10px",
    overflowY: "auto",
  }}
>
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`flex items-start my-3 ${
        msg.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {/* Avatar (only for bot) */}
      {msg.sender === "bot" && (
        <div className="w-8 h-8 rounded-full bg-purple-300 text-white text-center font-bold mr-2 flex items-center justify-center">
          M
        </div>
      )}

      {/* Chat Bubble */}
      <span
  className={`inline-block px-5 py-2 rounded-4xl ${
    msg.sender === 'user' ? 'bg-purple-200' : 'bg-gray-200'
  } max-w-[70%]`}
>
  <ReactMarkdown>{msg.text}</ReactMarkdown>
</span>

    </div>
  ))}

  {/* Gemini is typing... */}
  {isGeminiTyping && (
    <div className="flex items-center text-left my-2 animate-pulse">
      <div className="w-8 h-8 rounded-full bg-purple-300 text-white text-center font-bold mr-2 flex items-center justify-center">
        
      </div>
      <div className="rounded-2xl px-4 py-2 bg-gray-100 text-sm text-gray-800 max-w-[75%]">
        MochiPal is typing...
      </div>
    </div>
  )}
</div>


      {/* Input Box */}
      <div className="mt-2 flex items-center">
        <input
          className="w-full p-[10px] rounded-[20px] border border-gray-300"
          placeholder="Type Your Message..♡ "
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className='ml-3 py-2 px-4 rounded-full bg-purple-400 text-white hover:bg-purple-500'>
          <i className='fi fi-rr-comment text-xl'></i>
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
