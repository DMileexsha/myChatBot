import React from 'react'

const DotsNav = () => {
  return (
    <div className='flex space-x-2 justify-center items-center'>
        <div className='w-3 h-3 bg-black rounded-full'></div>
        <div className='w-3 h-3 bg-black rounded-full opacity-60'></div>
        <div className='w-3 h-3 bg-black rounded-full opacity-30'></div>
    </div>
  );
};

export default DotsNav;
