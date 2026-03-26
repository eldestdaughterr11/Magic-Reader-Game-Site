import React from 'react';

const MagicLogo = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center leading-none ${className}`}>
      <span className="font-magic text-4xl text-[#C67C4E] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] select-none">
        Magic
      </span>
      <span className="font-magic text-4xl text-[#C67C4E] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] select-none">
        Reader
      </span>
    </div>
  );
};

export default MagicLogo;
