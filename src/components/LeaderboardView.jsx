import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const LeaderboardView = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      // Fetch all scores to correctly aggregate total points per player
      const { data, error } = await supabase
        .from('leaderboards')
        .select('username, score');

      if (error) throw error;

      // Group by username and sum up points
      const aggregated = {};
      (data || []).forEach(entry => {
          if (!aggregated[entry.username]) {
              aggregated[entry.username] = { username: entry.username, score: 0 };
          }
          aggregated[entry.username].score += entry.score;
      });

      // Sort highest to lowest, then take Top 10
      const sortedTopPlayers = Object.values(aggregated)
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);

      setScores(sortedTopPlayers);
    } catch (err) {
      console.error('Error fetching leaderboard:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const achievementTitles = [
    { title: 'Word Master',       icon: '👑', color: 'text-yellow-400' },
    { title: 'Fast Solver',       icon: '⚡', color: 'text-blue-300'   },
    { title: 'Minigames Fanatic', icon: '🎮', color: 'text-green-300'  },
  ];

  return (
    <div className="flex flex-col items-center py-16 px-4 max-w-4xl mx-auto space-y-12">
      <h1 className="font-magic text-6xl text-[#E9D5FF] tracking-widest text-center">Top Players</h1>

      {/* ── Leaderboard Table ── */}
      <div className="w-full space-y-4">
        <h2 className="font-magic text-4xl text-[#E9D5FF] text-center">Leaderboard Table</h2>
        <div className="w-full bg-[#2D1E3A] border-4 border-[#77815C] rounded-sm overflow-hidden shadow-2xl transition-all hover:border-[#E9D5FF]/50">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#77815C] text-[#E9D5FF] border-b-4 border-[#77815C]">
                <th className="py-4 px-6 text-xl text-left border-r-4 border-[#77815C]">Rank</th>
                <th className="py-4 px-6 text-xl text-left border-r-4 border-[#77815C]">Player</th>
                <th className="py-4 px-6 text-xl text-right">Score</th>
              </tr>
            </thead>
            <tbody className="bg-amber-100/10 text-white font-bold">
              {loading ? (
                  <tr>
                      <td colSpan="3" className="py-12 text-center text-2xl font-magic text-purple-300">Loading Scores...</td>
                  </tr>
              ) : scores.length === 0 ? (
                  <tr>
                      <td colSpan="3" className="py-12 text-center text-xl text-white/50 italic">No scores yet. Be the first!</td>
                  </tr>
              ) : (
                  scores.map((s, i) => (
                      <tr key={s.username} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-6 border-r border-[#77815C]/20 text-3xl font-magic text-purple-300">#{i + 1}</td>
                          <td className="py-4 px-6 border-r border-[#77815C]/20 text-xl uppercase tracking-widest">{s.username}</td>
                          <td className="py-4 px-6 text-right text-3xl font-magic text-yellow-400">{s.score}</td>
                      </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Achievements Table ── */}
      <div className="w-full space-y-4">
        <h2 className="font-magic text-4xl text-[#E9D5FF] text-center">Achievements</h2>
        <div className="w-full bg-[#2D1E3A] border-4 border-[#77815C] rounded-sm overflow-hidden shadow-2xl transition-all hover:border-[#E9D5FF]/50">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#77815C] text-[#E9D5FF] border-b-4 border-[#77815C]">
                <th className="py-4 px-6 text-xl text-left border-r-4 border-[#77815C]">Rank</th>
                <th className="py-4 px-6 text-xl text-left border-r-4 border-[#77815C]">Player</th>
                <th className="py-4 px-6 text-xl text-left">Achievement</th>
              </tr>
            </thead>
            <tbody className="bg-amber-100/10 text-white font-bold">
              {loading ? (
                <tr>
                  <td colSpan="3" className="py-12 text-center text-2xl font-magic text-purple-300">Loading...</td>
                </tr>
              ) : scores.length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-12 text-center text-xl text-white/50 italic">No achievements yet.</td>
                </tr>
              ) : (
                scores.slice(0, 3).map((s, i) => (
                  <tr key={s.username} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 border-r border-[#77815C]/20 text-3xl font-magic text-purple-300">#{i + 1}</td>
                    <td className="py-4 px-6 border-r border-[#77815C]/20 text-xl uppercase tracking-widest">{s.username}</td>
                    <td className={`py-4 px-6 text-xl font-black tracking-wide ${achievementTitles[i]?.color}`}>
                      {achievementTitles[i]?.icon} {achievementTitles[i]?.title}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <button 
        onClick={fetchLeaderboard}
        className="bg-[#3D2E4A] hover:bg-[#4D3E5A] text-[#E9D5FF] py-3 px-8 text-xs font-black uppercase tracking-widest border border-white/20 shadow-xl transition-all"
      >
        Refresh List
      </button>
    </div>
  );
};

export default LeaderboardView;
