import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DotsNav from './DotsNav';
import TextInput from './TextInput'; 
import { motion } from 'framer-motion';

const clickSound = new Audio('/sounds/moodClick.mp3');
clickSound.volume = 0.6; 


// Define the moods with text-based emojis and their respective colors
const Moods = [
  {
    emoji: "😊",
    label: "Happy",
    color: "bg-pink-100 hover:bg-pink-200 border-pink-300",
  },
  {
    emoji: "😐",
    label: "Neutral",
    color: "bg-purple-100 hover:bg-purple-200 border-purple-300",
  },
  {
    emoji: "😢",
    label: "Sad",
    color: "bg-blue-100 hover:bg-blue-200 border-blue-300",
  },
  {
    emoji: "😠",
    label: "Angry",
    color: "bg-red-100 hover:bg-red-200 border-red-300",
  },
  {
    emoji: "😴",
    label: "Tired",
    color: "bg-indigo-100 hover:bg-indigo-200 border-indigo-300",
  },
  {
    emoji: "🤯",
    label: "Overwhelmed",
    color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-300",
  },
];


const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (selectedMood) {
      navigate('/chat', { state: { mood: selectedMood, userMessage: message } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-full p-0 relative">
      {/* Header Text */}
      <div className="text-center w-full mt-2">
        <h2 className="text-3xl font-bold text-custom-purple mb-0">
          How are you feeling today?
        </h2>
        <p className="text-lg text-gray-600 relative inline-block">
          Pick Your Mood..
          <span className="absolute top-1/2 left-[calc(100%+0.25rem)] -translate-y-1/2 text-xl">⭐</span>
        </p>
      </div>

      {/* Mood Grid - Now 3 columns for 6 emojis */}
      <div className="grid grid-cols-3 gap-x-5 gap-y-5 mt-1 w-full max-w-lg"> {/* Adjusted grid and max-width for better layout */}
        {Moods.map((mood, idx) => (

          <motion.button
      key={idx}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, delay: idx * 0.05 }}
      onClick={() => {
        clickSound.play();
        setSelectedMood(mood.label)}}
      className={`
        w-full h-28 bg-white rounded-xl border-2 flex flex-col items-center justify-center p-2
        transition-all duration-200 ease-in-out cursor-pointer
        shadow-md hover:shadow-lg
        ${mood.color}
        ${selectedMood === mood.label ? "ring-2 ring-offset-2 ring-custom-purple scale-105" : ""}
      `}
    >
      <span className="text-4xl">{mood.emoji}</span>
      <span className="mt-2 text-sm font-medium">{mood.label}</span>
    </motion.button>
        ))}
      </div>

      
      <div className="w-full text-center mt-7 max-w-md mx-auto">
        <p className="text-base text-gray-600 mb-18 relative -top-7">Wanna tell me more...?</p>
        <div className="flex items-center w-full">
          <TextInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow rounded-xl border border-purple-400 p-3 resize-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
          />
          {/* New Send Icon Button (using <i> tag as requested) */}
          <button
            onClick={handleSubmit}
            disabled={!selectedMood} // Button is disabled if no mood is selected
            className={`
              ml-2 w-10 h-10 rounded-full bg-purple-300
        flex items-center justify-center shrink-0
        transition duration-200
        -translate-y-19 transform
        
        ${!selectedMood ? "opacity-30 cursor-pointer" : "hover:bg-purple-400 cursor-pointer "}
      `}
          >
            {/* The icon you provided */}
            <i className="fi fi-rr-paper-plane text-white text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <DotsNav />
      </div>
    </div>
  );
};

export default MoodSelector;