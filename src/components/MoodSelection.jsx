import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function MoodSelection() {
  const navigate = useNavigate();
  const [customMood, setCustomMood] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    clickSound.play()
    
    
    // If there's a custom message, navigate with both
    if (customMood.trim()) {
      navigate('/chat', {
        state: { mood, initialMessage: customMood.trim() },
      });
    } else {
      // Only mood selected
      navigate('/chat', {
        state: { mood },
      });
    }
  };

 const handleCustomMoodSubmit = () => {
  if (!selectedMood) {
    alert("Please select a mood first.");
    return;
  }

  navigate('/chat', {
    state: {
      mood: selectedMood,
      initialMessage: customMood.trim() || ''
    }
  });
};


  return (
    <div className='w-full h-full p-4 bg-[#f7e9fb] rounded-xl overflow-auto'>
      <h2>How are you feeling?</h2>

      <div className="flex flex-wrap gap-3 mt-4">
        <button onClick={() => handleMoodClick('Happy')}>😊 Happy</button>
        <button onClick={() => handleMoodClick('Neutral')}>😐 Neutral</button>
        <button onClick={() => handleMoodClick('Sad')}>😢 Sad</button>
        <button onClick={() => handleMoodClick('Angry')}>😠 Angry</button>
        <button onClick={() => handleMoodClick('Overwhelmed')}>🤯 Overwhelmed</button>
        <button onClick={() => handleMoodClick('Tired')}>😴 Tired</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Share what's on your mind..."
          value={customMood}
          onChange={(e) => setCustomMood(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCustomMoodSubmit();
          }}
          style={{ width: '300px', padding: '8px' }}
        />
        <button
          onClick={handleCustomMoodSubmit}
          className="ml-2 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default MoodSelection;
