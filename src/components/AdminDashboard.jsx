import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const AdminDashboard = ({ user }) => {
  const [stats, setStats] = useState({ users: 0, scores: 0, topPerformance: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // In a real app, these would be separate table counts.
        // For now, we fetch a count of leaders as a proxy.
        const { count: userCount, error: userError } = await supabase
          .from('leaderboards')
          .select('*', { count: 'exact', head: true });

        const { data: scoreData, error: scoreError } = await supabase
          .from('leaderboards')
          .select('score');

        if (userError || scoreError) throw userError || scoreError;

        const totalScores = scoreData.reduce((acc, curr) => acc + curr.score, 0);
        const maxScore = Math.max(...scoreData.map(s => s.score), 0);

        setStats({
          users: userCount || 0,
          scores: totalScores || 0,
          topPerformance: maxScore || 0
        });
      } catch (err) {
        console.error("Error fetching admin stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col p-10 font-mono">
      <div className="flex justify-between items-center border-b border-red-900/40 pb-6 mb-12">
          <div className="space-y-1">
              <h1 className="text-3xl font-black text-red-500 uppercase">System Administration</h1>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Operator: {user?.email}</p>
          </div>
          <div className="px-4 py-2 border border-red-900/60 bg-red-950/20 text-red-500 text-xs font-black rounded uppercase tracking-tighter">
              Level: ROOT
          </div>
      </div>

      {loading ? (
        <div className="flex-grow flex items-center justify-center">
            <div className="animate-spin h-10 w-10 border-t-2 border-red-500 rounded-full"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl w-full mx-auto">
            {/* Stat Cards */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg shadow-2xl space-y-4 hover:border-red-900/40 transition-colors">
                <p className="text-xs text-zinc-500 uppercase tracking-widest">Active Operations</p>
                <p className="text-6xl font-black text-white">{stats.users}</p>
                <p className="text-[10px] text-zinc-600 uppercase font-black">Unique Player Records Found</p>
            </div>
            
            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg shadow-2xl space-y-4 hover:border-red-900/40 transition-colors">
                <p className="text-xs text-zinc-500 uppercase tracking-widest">Energy Flow</p>
                <p className="text-6xl font-black text-white">{stats.scores.toLocaleString()}</p>
                <p className="text-[10px] text-zinc-600 uppercase font-black">Accumulated Total Experience Points</p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg shadow-2xl space-y-4 hover:border-red-900/40 transition-colors">
                <p className="text-xs text-zinc-500 uppercase tracking-widest">Threshold Status</p>
                <p className="text-6xl font-black text-white">{stats.topPerformance}</p>
                <p className="text-[10px] text-zinc-600 uppercase font-black">Current Apex Performance Metric</p>
            </div>

            {/* Controls Bar */}
            <div className="md:col-span-3 bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg space-y-6">
                <h3 className="text-lg font-black text-red-500 uppercase underline decoration-red-900/40 underline-offset-8">Server Controls</h3>
                <div className="flex flex-wrap gap-4">
                    <button className="bg-red-900 hover:bg-black border border-red-900 text-white font-black py-4 px-8 text-xs uppercase transition-all tracking-widest">Purge Temp Logs</button>
                    <button className="bg-zinc-800 hover:bg-zinc-700 text-white font-black py-4 px-8 text-xs uppercase transition-all tracking-widest">Sync Database</button>
                    <button className="bg-zinc-800 hover:bg-zinc-700 text-white font-black py-4 px-8 text-xs uppercase transition-all tracking-widest">Update Assets</button>
                </div>
            </div>
        </div>
      )}

      {/* Warning Overlay */}
      <div className="mt-20 border-t-2 border-red-900/20 pt-10 text-center">
        <p className="text-[10px] text-zinc-600 uppercase font-black tracking-[0.4em] animate-pulse">Caution: All actions are logged under administrative credentials.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
