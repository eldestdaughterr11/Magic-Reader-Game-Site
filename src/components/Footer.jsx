import React from 'react';
import MagicLogo from './MagicLogo';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-[#77815C] text-[#E9D5FF] py-12 px-6 border-t-4 border-[#5E6847]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="flex flex-col items-center gap-4 text-center max-w-xs">
          <MagicLogo className="scale-90" />
          <p className="font-bold text-lg leading-tight">
            Explore, Learn, and Play with Words!
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
          <h3 className="font-magic text-3xl uppercase tracking-wider text-[#E9D5FF]">Navigation</h3>
          <ul className="flex flex-col gap-2 font-bold text-lg">
            <li><button onClick={() => onNavigate && onNavigate('home')} className="hover:text-white underline decoration-white-400">Home</button></li>
            <li><button onClick={() => onNavigate && onNavigate('game')} className="hover:text-white underline decoration-white-400">Game</button></li>
            <li><button onClick={() => onNavigate && onNavigate('leaderboards')} className="hover:text-white underline decoration-white-400">Leaderboards</button></li>
            <li><button onClick={() => onNavigate && onNavigate('about')} className="hover:text-white underline decoration-white-400">About</button></li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
          <button 
            onClick={() => onNavigate && onNavigate('resources')}
            className="font-magic text-3xl uppercase tracking-wider text-[#E9D5FF] hover:text-white transition-colors"
          >
            Resources
          </button>
          <ul className="flex flex-col gap-2 font-bold text-lg">
            <li><button onClick={() => onNavigate && onNavigate('resources')} className="hover:text-white underline decoration-white-400">Guides</button></li>
            <li><button onClick={() => onNavigate && onNavigate('resources')} className="hover:text-white underline decoration-white-400">Tips</button></li>
            <li><button onClick={() => onNavigate && onNavigate('resources')} className="hover:text-white underline decoration-white-400">Lessons</button></li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
          <h3 className="font-magic text-3xl uppercase tracking-wider text-[#E9D5FF]">Contact</h3>
          <ul className="flex flex-col gap-2 font-bold text-lg">
            <li><a href="#" className="hover:text-white underline decoration-white-400">Email</a></li>
            <li><a href="#" className="hover:text-white underline decoration-white-400">Social Media</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-16 text-center font-bold text-lg border-t pt-8 border-[#5E6847]">
        <p>© 2026 Dream Pixels. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

