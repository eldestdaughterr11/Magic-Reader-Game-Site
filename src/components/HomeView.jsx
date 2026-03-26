import React from 'react';

const HomeView = ({ user }) => {
  return (
    <div className="flex flex-col items-center py-16 px-4 w-full bg-[#3E2F49] space-y-24">
      {/* Welcome Section */}
      {user && (
        <section className="text-center">
            <h1 className="font-magic text-6xl text-[#E9D5FF] mb-2 tracking-widest">Welcome, {user.username}!</h1>
            <p className="text-white font-bold opacity-80 uppercase tracking-tighter">Your adventure in Word Valley awaits.</p>
        </section>
      )}

      {/* Teaser Video */}
      <section className="w-full max-w-5xl flex flex-col items-center gap-10">
        <h2 className="font-magic text-5xl text-[#E9D5FF] tracking-wide text-center">Teaser Video</h2>
        <div className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border-8 border-black/20 shadow-2xl bg-black/40 group">
          <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity flex items-center justify-center overflow-hidden">
             {/* Character Art Mockup Background */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
             <div className="w-full h-full bg-[#1E1428] flex items-center justify-center">
                <p className="font-magic text-6xl text-white/20 select-none">MAGIC READER ARTWORK</p>
             </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform border-4 border-white/40 shadow-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
          {/* Progress bar like in screenshot */}
          <div className="absolute bottom-8 left-12 right-12 flex gap-4 items-center">
             <div className="h-4 bg-gray-400/50 rounded-full flex-grow relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 left-0 h-full w-2/3 bg-gray-200"></div>
             </div>
             <div className="w-24 h-4 bg-gray-400/50 rounded-full backdrop-blur-sm"></div>
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="w-full max-w-5xl flex flex-col items-center gap-12 text-center">
        <h2 className="font-magic text-5xl text-[#E9D5FF] tracking-wide uppercase">Story</h2>
        <div className="space-y-10 text-lg md:text-xl font-bold leading-relaxed text-[#E9D5FF]/90 max-w-5xl px-6">
          <p>
            The story starts off with Penn (or Paige), who loves playing and learning, but when it comes to the English subject, they have trouble in learning and reading. When they say a word with phonics or vowels in them, they become embarrassed due to them not being proficient. All of these are reasons why they go quiet and just wish the sounds were easier to understand.
          </p>
          <p>
            On a Monday morning, which is their examination day, they arrive at the classroom early, which is still empty. They tried to review their notes one last time, hoping it would help them understand the lessons better. The school bell rang, signaling that the exam would begin at any minute. Their hands felt cold as they held their pencil, wondering whether they'll get another low score. As the classroom becomes filled with students and their teacher, the examination starts. As they glanced down on their exam paper, they noticed a faint glow shining from beneath their desk. Curiously, they bent down and saw a colorful, shimmering book that hadn't been there before. Its cover read: "The Sound Book", and they opened it. A bright light bursts from the book, surrounding them in a warm glow. They looked around the classroom mystified as everyone around was frozen in time, and before they knew it, they were pulled straight into the pages of the book.
          </p>
          <p>
            They land in Word Valley—a once beautiful place built from big, colorful letters and singing sounds. A guide called Pip, a wise owl, immediately comes down to greet you. Pip explains the world and the mission, an adventure that they need to do. What was once a bright and colorful world is being tormented by the "mush-mush" curse, inflicted by Miss Spell, the envious witch. The 5 houses: A, E, I, O, U and their vowel stones are sealed because of the curse, so the goal of the player is to recover the vowel stones and restore the world to its former glory.
          </p>
          <p>
            While adventuring, the valley will slowly be restored, and the player will encounter Miss Spell, in which they would have to defeat her to fully break the curse.
          </p>
        </div>

        <button className="mt-12 bg-[#2D1E3A] border border-white/20 hover:bg-[#1E1428] py-6 px-24 text-lg uppercase font-black tracking-[0.2em] shadow-2xl hover:scale-105 transition-all text-white active:scale-95">
          PLAY NOW
        </button>
      </section>
    </div>
  );
};

export default HomeView;
