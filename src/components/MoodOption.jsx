import React from 'react'

const MoodOption = ({icon, selected, onClick}) => {
  return (
    <button
    onClick={onClick}
    className={`w-20 h-20 border-2 rounded-xl p-2 transition-all ${
    selcted? "border-purple-500 scale-105" : "border-gray-300"}`}
    >
    <img src='{icon}'alt='mood' className='w-full h-full object-contain'/>
    </button>    

      
    
  )
}

export default MoodOption
