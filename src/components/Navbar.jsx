import React, { useState } from 'react';
import MagicLogo from './MagicLogo';

const Navbar = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Game', id: 'game' },
    { name: 'Leaderboards', id: 'leaderboards' },
    { name: 'Resources', id: 'resources' },
    { name: 'About', id: 'about' },
  ];

  const handleLinkClick = (id) => {
    onNavigate && onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-[#77815C] py-2 px-6 flex items-center justify-between border-b-4 border-[#5E6847] sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <MagicLogo className="scale-[0.6] md:scale-75 origin-left" />
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 lg:gap-12">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => handleLinkClick(link.id)}
            className="font-magic text-2xl text-[#E9D5FF] hover:text-white transition-colors"
          >
            {link.name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <button 
          onClick={() => handleLinkClick('logout')}
          className="hidden sm:block text-xs font-black text-[#E9D5FF] uppercase tracking-widest hover:text-white transition-colors"
        >
          Logout
        </button>
        
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-black flex items-center justify-center bg-gray-300 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        </div>

        {/* Hamburger Icon */}
        <button 
          className="md:hidden text-[#E9D5FF] p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#77815C] border-b-4 border-[#5E6847] flex flex-col p-6 gap-6 md:hidden z-40 shadow-2xl animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="font-magic text-3xl text-[#E9D5FF] hover:text-white text-left transition-colors border-b-2 border-[#5E6847] pb-2"
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => handleLinkClick('logout')}
            className="text-lg font-black text-red-200 uppercase tracking-widest text-left"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
