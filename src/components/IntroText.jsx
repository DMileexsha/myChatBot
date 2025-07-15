// src/components/IntroText.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
const clickSound = new Audio('/sounds/moodClick.mp3');
clickSound.volume = 0.6;



const IntroText = () => { 
  const navigate = useNavigate(); 

  const handleStartClick = () => {
    clickSound.play();
    navigate('/mood'); 
  };

  return (
    <div className='text-center md:text-left'>
     

      <h1 className='text-4xl font-bold text-[#8e24aa]'>Hi! I'm</h1>
      <h1 className='text-5xl font-extrabold text-purple-500 mt-2'>MochiPal</h1>

      <button
        onClick={handleStartClick} 
        className='mt-5 px-8 py-2 bg-purple-200 hover:bg-purple-300 text-white font-semibold rounded-full flex items-center gap-4  cursor-pointer'
      >
        <i className='fi fi-rr-paper-plane text-black text-2xl'></i>
        <span>Your lil support bean</span>
      </button>
    </div>
  );
};

export default IntroText;