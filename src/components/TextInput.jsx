// src/components/TextInput.jsx
import React from 'react';

const TextInput = ({ value, onChange, className }) => { // <--- 'className' is correctly handled here
  return (
    
    <textarea
      placeholder="Share what's on your mind................"
      value={value}
      onChange={onChange}
      className={`
        -mt-38 /* <-- ADDED: Added a margin-top here. Adjust as needed. */
        w-full h-16 p-3 rounded-xl border border-gray-300 text-base outline-none resize-none
        focus:border-[#8e24aa] focus:ring-1 focus:ring-[#8e24aa] placeholder-gray-400
        transition-all duration-200 ease-in-out
        ${className || ''} /* This applies additional classes passed from MoodSelector.jsx (like pr-12) */
      `}

      
    />
    


    
  );
};

export default TextInput;