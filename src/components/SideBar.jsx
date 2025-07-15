// src/components/SideBar.jsx
import React from 'react';
import Mochigirl from '/icon.png'; 


const SideBar = ({ onClose }) => { // Accept onClose prop
  return (
    <div className="w-full h-8 bg-[#d6a7f7] flex items-center justify-between px-3 shadow-md relative z-10">
      <img
        src={Mochigirl}
        alt="MochiPal Icon"
        className="w-12 h-6 object-contain"
      />
      <button
        onClick={onClose} // This will trigger the navigate('/') from SideBarWithNavigation
        className="text-white text-3xl font-light leading-none cursor-pointer
                   hover:scale-110 transition-transform duration-200"
      >
        X
      </button>
    </div>
  );
};

export default SideBar;