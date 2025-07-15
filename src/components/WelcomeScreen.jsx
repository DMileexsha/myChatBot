import React from 'react';
import IntroText from './IntroText';
import DotsNav from './DotsNav';
import KawaiImage from './KawaiImage';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const WelcomeScreen = ({ onStart }) => {
  const navigate = useNavigate(); // Initialize navigate
  const handleStartClick = () => {
    if (onStart) {
      onStart(); // If a prop function is provided
    }
    navigate('/mood'); // Navigate to the mood selection page
  };

  return (
    <div className='flex flex-col bg-white h-full w-full rounded-xl'> {/* Changed background to white for consistency with inner components, inherited from ChatContainer/App.js */}
        {/* Main content area: IntroText and KawaiImage */}
        <div className='flex-1 flex flex-col md:flex-row justify-center items-center gap-10 px-6 py-4 overflow-hidden'> {/* Increased gap */}
            {/* Pass the handleStartClick function to IntroText */}
            <IntroText onStartClick={handleStartClick} />
            <KawaiImage />
        </div>

        {/* Dots Navigation */}
        <div className='flex justify-center items-center py-4'> {/* Corrected typo 'lex' to 'flex', increased vertical padding */}
            <DotsNav />
        </div>
    </div>
  );
};

export default WelcomeScreen;