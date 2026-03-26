import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const GameView = ({ user }) => {
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('gameplay');
  
  const submitScore = async (scoreValue) => {
    // ... rest of submitScore remains same ...
    if (!user?.id) {
        alert("Please login to save your score!");
        return;
    }

    try {
        setSubmitting(true);
        const { error } = await supabase
            .from('leaderboards')
            .insert([
                { 
                  user_id: user.id, 
                  username: user.username, 
                  score: scoreValue,
                  level_name: 'Level A'
                }
            ]);

        if (error) throw error;
        alert(`Score of ${scoreValue} submitted successfully! Check the Leaderboards.`);
    } catch (err) {
        alert("Error submitting score: " + err.message);
    } finally {
        setSubmitting(false);
    }
  };

  const challenges = [
    { letter: 'A', name: 'Sheriff Sans', color: 'bg-blue-600', text: "In the A challenge, players will test their letter recognition and vocabulary skills. Hints will be given during cutscenes through Sheriff Sans' dialogue and with Pip's help." },
    { letter: 'E', name: 'Pip', color: 'bg-yellow-600', text: "In the E challenge, players test their grammar skills. Pip will provide trivia related to verb rules to guide them." },
    { letter: 'I', name: 'Penny Clix', color: 'bg-green-600', text: "In the I challenge, players will test their vocabulary and encoding skills. Hints will be given during cutscenes through Penny Clix's dialogue and with Pip's help." },
    { letter: 'O', name: 'Grandma Phonics', color: 'bg-pink-600', text: "In the O challenge, players will test their phonetic skills. Hints will be given during cutscenes through Grandma Phonics' dialogue and with Pip's help." },
    { letter: 'U', name: 'Miss Spell', color: 'bg-red-600', text: "In the U challenge, players will test their vowel recognition skills. Hints will be given on the book at each section of the challenge and with Pip's help." },
  ];

  const renderGameplay = () => (
    <>
      {/* Intro */}
      <section className="text-center max-w-4xl space-y-4 md:space-y-6">
        <h2 className="font-magic text-[#E9D5FF] text-3xl md:text-4xl px-2">What is Magic Reader?</h2>
        <p className="text-base md:text-xl font-bold leading-relaxed text-[#E9D5FF]/90 px-4">
          Magic Reader is an educational game that combines animation, puzzles, and storytelling. In this game, the player will encounter educational challenges as they progress through each stage of the map. The gameplay will consist of three types: Shooting game, Puzzle Game, and a Platformer Game with brainy tasks for learning.
        </p>
      </section>

      {/* How to Play */}
      <section className="w-full flex flex-col items-center gap-8 md:gap-12">
        <h2 className="font-magic text-3xl md:text-4xl text-[#E9D5FF]">How to Play</h2>
        
        <div className="flex flex-col gap-16 md:gap-24 w-full">
          {challenges.map((challenge, index) => (
            <div key={challenge.letter} className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className={`w-48 h-48 md:w-64 md:h-64 ${challenge.color} rounded-full flex items-center justify-center p-4 shadow-2xl relative shrink-0`}>
                <span className="text-white font-black text-6xl md:text-9xl drop-shadow-2xl">{challenge.letter}</span>
                <div className="absolute -top-4 -right-4 w-12 h-12 md:w-20 md:h-20 bg-white/10 rounded-full blur-xl"></div>
              </div>
              <div className="flex-1 text-center md:text-left space-y-3 px-4">
                <p className="text-lg md:text-xl font-bold leading-relaxed text-[#E9D5FF]/90">
                  {challenge.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Objectives */}
      <section className="text-center max-w-4xl space-y-8 md:space-y-12 py-8 md:py-16 w-full">
        <h2 className="font-magic text-[#E9D5FF] text-3xl md:text-4xl">Objectives</h2>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-4 md:mb-8 px-2">
           {['A', 'E', 'I', 'O', 'U'].map(v => (
             <div key={v} className="bg-purple-900/50 w-16 h-24 md:w-24 md:h-32 rounded-lg md:rounded-xl flex items-center justify-center border-2 md:border-4 border-purple-800 shadow-xl transform hover:scale-110 transition-transform">
                <span className="text-white font-black text-4xl md:text-6xl drop-shadow-lg">{v}</span>
             </div>
           ))}
        </div>
        <p className="text-base md:text-xl font-bold leading-relaxed text-[#E9D5FF]/90 px-4">
          The main objective of the game is to restore Word Valley and defeat Miss Spell through the Ritual of Restoration.
        </p>
      </section>

      {/* Controls Table */}
      <section className="w-full max-w-2xl py-8">
        <h2 className="font-magic text-3xl md:text-4xl text-[#E9D5FF] text-center mb-8 md:mb-12">Controls</h2>
        <div className="overflow-x-auto rounded-sm md:rounded-none">
          <table className="w-full border-collapse border-2 md:border-4 border-[#77815C]">
            <thead>
              <tr className="bg-[#77815C] text-[#E9D5FF] border-b-2 md:border-b-4 border-[#77815C]">
                <th className="py-3 md:py-4 px-4 md:px-6 text-lg md:text-xl text-left border-r-2 md:border-r-4 border-[#77815C]">Keystrokes</th>
                <th className="py-3 md:py-4 px-4 md:px-6 text-lg md:text-xl text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-amber-100 text-[#211915] font-black uppercase tracking-tight text-sm md:text-base">
              {[
                { k: 'WASD', a: 'Movement' },
                { k: 'Spacebar', a: 'Jump' },
                { k: 'Mouse', a: 'Interactions' },
              ].map((c, i) => (
                <tr key={i} className="border-b border-[#77815C]/20">
                  <td className="py-2 md:py-3 px-4 md:px-6 border-r-2 md:border-r-4 border-[#77815C]">{c.k}</td>
                  <td className="py-2 md:py-3 px-4 md:px-6">{c.a}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );

  const gameCharacters = [
    {
      name: "Penn",
      desc: "The male lead student who is jolly and enjoys playing with his classmates, but is often found struggling with reading words and sentences.",
      placeholder: "bg-blue-800 text-white",
      letter: "P"
    },
    {
      name: "Paige",
      desc: "The female lead student who loves learning with her friends, but is often found struggling with English subjects because she struggles with reading words and sentences.",
      placeholder: "bg-pink-800 text-white",
      letter: "P"
    },
    {
      name: "The Guide (Pip the Owl) NPC",
      desc: "Pip is the Mayor of Word Valley and appears as a magical owl. She acts as a guide and tutorial system. She provides vocal guidance and clues to help the player navigate the challenges without revealing the direct answer.",
      placeholder: "bg-amber-700 text-white",
      letter: "P"
    },
    {
      name: "The Archmage (NPC)",
      desc: "The powerful mage who serves as Word Valley's protector and guardian. She was cursed and transformed into an owl by Miss Spell. The townspeople admire her for her genuine heart towards her magical skills. She is revealed at the game's conclusion when the curse is finally broken.",
      placeholder: "bg-purple-600 text-white",
      letter: "A"
    },
    {
      name: "The Antagonist (Miss Spell) NPC",
      desc: "Miss Spell is the wicked boss of the Word Valley. Her motivation stems from frustration rather than evil. For letters and words appear to disobey her, just like the protagonist. Driven by envy, she casts the curse to scramble the language of the realm and bends the physical letters of the world into fragmented pieces.",
      placeholder: "bg-green-800 text-white",
      letter: "M"
    },
    {
      name: "Sylla Belle",
      desc: "Sylla Belle is a non-interactable NPC, who appears at the end of the game, receiving the Secret Book from Penn or Paige, and has a striking resemblance to Miss Spell.",
      placeholder: "bg-indigo-600 text-white",
      letter: "S"
    },
    {
      name: "Town Governor: Sheriff Sans (House A)",
      desc: "House 'A' Governed by Sheriff Sans. The player uses the wand to pick up fragmented parts of citizens and places them into the correct spots. This visual puzzle tests letter recognition and formation.",
      placeholder: "bg-blue-500 text-white",
      letter: "A"
    },
    {
      name: "Town Governor: Judge Mental (House E)",
      desc: "House E Governed by Judge Mental. The player needs to complete sentences on a scroll. They must use the magic wand to select the correct fitting verb such as (is or are) to complete the sentence grammar.",
      placeholder: "bg-yellow-200 text-black",
      letter: "E"
    },
    {
      name: "Town Governor: Penny Cil (House I)",
      desc: "House I Governed by Penny Cil. This area focuses on spelling and word arrangement. The player must retrieve scattered letters from the level and arrange them in the correct sequence to form a valid word.",
      placeholder: "bg-yellow-400 text-black",
      letter: "I"
    },
    {
      name: "Town Governor: Grandma Phonic (House O)",
      desc: "House O Governed by Grandma Phonics. This is an auditory challenge where the player listens to a magical music track. They must choose the correct rhyming words to complete the lyrics of a song.",
      placeholder: "bg-pink-300 text-black",
      letter: "O"
    },
    {
      name: "Town Governor: Connie Sonant (House U)",
      desc: "House U Directed by Connie Sonant. Set in a classic library, this puzzle tests auditory vowel recognition. The player listens to a recorded word and must identify the specific vowel sound used in the audio clip.",
      placeholder: "bg-red-400 text-white",
      letter: "U"
    },
    {
      name: "Teacher and Students (Non-interactable NPCs)",
      desc: "Teachers and students are non-interactable NPCs who appear in the cutscenes (Intro and Outro) to portray a classroom environment.",
      placeholder: "bg-gray-400 text-white",
      letter: "T"
    }
  ];

  const renderCharacters = () => (
    <section className="w-full max-w-5xl space-y-12">
        <div className="flex flex-col gap-12 md:gap-16 w-full">
            {gameCharacters.map((char, i) => (
                <div key={char.name} className="flex flex-col md:flex-row items-center gap-8 md:gap-16 hover:bg-white/5 transition-colors rounded-xl p-4 md:p-8">
                    {/* Placeholder for Character Sprite (You can replace this with <img src={...} /> later) */}
                    <div className={`w-36 h-36 md:w-48 md:h-48 shrink-0 ${char.placeholder} rounded-2xl flex items-center justify-center font-black text-6xl shadow-2xl transform hover:scale-105 transition-all outline outline-4 outline-white/10`}>
                        {char.letter}
                    </div>
                    
                    {/* Centered Character Text block */}
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 px-2 w-full max-w-2xl">
                        <h4 className="font-magic text-3xl md:text-5xl text-yellow-500 drop-shadow-md">{char.name}</h4>
                        <p className="text-white/90 font-bold text-lg md:text-xl leading-relaxed">{char.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
  );

  const renderDownload = () => (
    <section className="flex flex-col items-center justify-center space-y-8 min-h-[40vh] text-center">
        <h2 className="font-magic text-6xl text-[#E9D5FF]">Ready for Adventure?</h2>
        <p className="text-2xl text-white/80 max-w-lg font-bold">Download Magic Reader now and start mending Word Valley!</p>
        <button className="bg-green-600 hover:bg-green-500 text-white font-black py-6 px-16 rounded-full text-2xl shadow-2xl transform hover:-translate-y-2 transition-all border-b-8 border-green-800 active:border-b-0 active:translate-y-1">
            DOWNLOAD FOR WINDOWS
        </button>
        <p className="text-sm text-white/40 italic">Version 1.0.4 - 250MB</p>
    </section>
  );

  return (
    <div className="flex flex-col items-center py-10 md:py-16 px-4 max-w-6xl mx-auto space-y-12 md:space-y-20">
      {/* Top Tabs */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-16 font-magic text-2xl md:text-5xl text-[#E9D5FF]/60">
        {['gameplay', 'characters', 'download'].map(tab => (
            <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`transition-all hover:text-[#E9D5FF] capitalize ${activeTab === tab ? 'text-[#E9D5FF] underline decoration-[#E9D5FF] decoration-4 underline-offset-8' : ''}`}
            >
                {tab}
            </button>
        ))}
      </div>

      {/* Logic based on tab */}
      <div className="w-full flex flex-col items-center space-y-12 md:space-y-20">
        {activeTab === 'gameplay' && renderGameplay()}
        {activeTab === 'characters' && renderCharacters()}
        {activeTab === 'download' && renderDownload()}
      </div>

      {/* Score Submission (Fixed at bottom) */}
      <section className="w-full bg-[#2D1E3A]/80 p-8 rounded-xl border border-white/20 text-center space-y-6 shadow-2xl">
        <h3 className="font-magic text-3xl text-yellow-400">Database Connection Test</h3>
        <p className="text-white/70 italic">Click below to simulate finishing a level and saving your score to Supabase.</p>
        <div className="flex justify-center gap-4">
            <button 
                onClick={() => submitScore(Math.floor(Math.random() * 500) + 500)}
                disabled={submitting}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 px-12 rounded-full transform hover:scale-105 transition-all shadow-lg active:scale-95 disabled:bg-gray-500"
            >
                {submitting ? 'Saving...' : 'Submit Score'}
            </button>
        </div>
      </section>
    </div>
  );
};

export default GameView;
