import React from 'react';
import MagicLogo from './MagicLogo';

const Navbar = ({ onNavigate }) => {
  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Game', id: 'game' },
    { name: 'Leaderboards', id: 'leaderboards' },
    { name: 'Resources', id: 'resources' },
    { name: 'About', id: 'about' },
  ];

  return (
    <nav className="bg-[#77815C] py-2 px-6 flex items-center justify-between border-b-4 border-[#5E6847]">
      <div className="flex items-center gap-4">
        {/* Logo at the left for desktop, or centered like in some screens */}
        <MagicLogo className="scale-75" />
      </div>

      <div className="hidden md:flex items-center gap-12">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => onNavigate && onNavigate(link.id)}
            className="font-magic text-2xl text-[#E9D5FF] hover:text-white transition-colors"
          >
            {link.name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => onNavigate && onNavigate('logout')}
          className="text-xs font-black text-[#E9D5FF] uppercase tracking-widest hover:text-white transition-colors"
        >
          Logout
        </button>
        <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center bg-gray-300 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
