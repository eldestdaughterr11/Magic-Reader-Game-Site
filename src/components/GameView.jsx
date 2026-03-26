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
      <section className="text-center max-w-4xl space-y-6">
        <h2 className="font-magic text-[#E9D5FF] text-4xl">What is Magic Reader?</h2>
        <p className="text-xl font-bold leading-relaxed text-[#E9D5FF]/90">
          Magic Reader is an educational game that combines animation, puzzles, and storytelling. In this game, the player will encounter educational challenges as they progress through each stage of the map. The gameplay will consist of three types: Shooting game, Puzzle Game, and a Platformer Game with brainy tasks for learning, where you are on a hunt, a mission to mend "Word Valley" wrecked by this villain named Miss Spell who stirred up total disorder.
        </p>
      </section>

      {/* How to Play */}
      <section className="w-full flex flex-col items-center gap-12">
        <h2 className="font-magic text-4xl text-[#E9D5FF]">How to Play</h2>
        
        <div className="flex flex-col gap-24 w-full">
          {challenges.map((challenge, index) => (
            <div key={challenge.letter} className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className={`w-64 h-64 ${challenge.color} rounded-full flex items-center justify-center p-4 shadow-2xl relative`}>
                <span className="text-white font-black text-9xl drop-shadow-2xl">{challenge.letter}</span>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
              </div>
              <div className="flex-1 text-center md:text-left space-y-4">
                <p className="text-xl font-bold leading-relaxed text-[#E9D5FF]/90">
                  {challenge.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Objectives */}
      <section className="text-center max-w-4xl space-y-12 py-16">
        <h2 className="font-magic text-[#E9D5FF] text-4xl">Objectives</h2>
        <div className="flex justify-center gap-4 mb-8">
           {['A', 'E', 'I', 'O', 'U'].map(v => (
             <div key={v} className="bg-purple-900/50 w-24 h-32 rounded-xl flex items-center justify-center border-4 border-purple-800 shadow-xl transform hover:scale-110 transition-transform">
                <span className="text-white font-black text-6xl drop-shadow-lg">{v}</span>
             </div>
           ))}
        </div>
        <p className="text-xl font-bold leading-relaxed text-[#E9D5FF]/90">
          The main objective of the game is to restore Word Valley and defeat Miss Spell through the Ritual of Restoration.
        </p>
      </section>

      {/* Controls Table */}
      <section className="w-full max-w-2xl py-12">
        <h2 className="font-magic text-4xl text-[#E9D5FF] text-center mb-12">Controls</h2>
        <table className="w-full border-collapse border-4 border-[#77815C]">
          <thead>
            <tr className="bg-[#77815C] text-[#E9D5FF] border-b-4 border-[#77815C]">
              <th className="py-4 px-6 text-xl text-left border-r-4 border-[#77815C]">Keystrokes</th>
              <th className="py-4 px-6 text-xl text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-amber-100 text-[#211915] font-black uppercase tracking-tight">
            {[
              { k: 'WASD', a: 'Movement' },
              { k: 'Spacebar', a: 'Jump' },
              { k: 'Mouse', a: 'Interactions' },
            ].map((c, i) => (
              <tr key={i} className="border-b-2 border-[#77815C]/20">
                <td className="py-3 px-6 border-r-4 border-[#77815C]">{c.k}</td>
                <td className="py-3 px-6">{c.a}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );

  const renderCharacters = () => (
    <section className="w-full max-w-4xl space-y-12">
        <h2 className="font-magic text-5xl text-center text-[#E9D5FF]">Meet the Characters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenges.map(char => (
                <div key={char.name} className="bg-[#2D1E3A] border-2 border-[#E9D5FF]/20 p-8 rounded-lg flex items-start gap-6 hover:border-yellow-400/50 transition-all group">
                    <div className={`w-20 h-20 shrink-0 ${char.color} rounded-full flex items-center justify-center font-black text-4xl text-white shadow-xl group-hover:scale-110 transition-transform`}>
                        {char.letter}
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-magic text-3xl text-yellow-400">{char.name}</h4>
                        <p className="text-white/80 font-bold">{char.text}</p>
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
    <div className="flex flex-col items-center py-16 px-4 max-w-6xl mx-auto space-y-20">
      {/* Top Tabs */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 font-magic text-4xl md:text-5xl text-[#E9D5FF]/60 mt-[-20px]">
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
      {activeTab === 'gameplay' && renderGameplay()}
      {activeTab === 'characters' && renderCharacters()}
      {activeTab === 'download' && renderDownload()}

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
