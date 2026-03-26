import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AdminLogin = ({ onLoginSuccess, onSwitchToUserLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
        });

        if (signInError) throw signInError;

        // For this demo, we check if the user is an admin 
        // using metadata or a specific email. 
        // In a real app, this should be checked against a server-side role.
        const isAdmin = data.user?.user_metadata?.role === 'admin' || data.user?.email === 'admin@magicreader.com';

        if (isAdmin) {
            onLoginSuccess && onLoginSuccess(data.user);
        } else {
            // Log them out if they aren't an admin
            await supabase.auth.signOut();
            setError("Access Restricted. This portal is for Administrators only.");
        }
    } catch (err) {
        setError(err.message || "Invalid credentials.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] px-4 py-12 overflow-hidden bg-black">
      <div className="relative z-10 w-full max-w-md flex flex-col items-center p-8 bg-zinc-900 border-2 border-red-900/40 rounded-xl shadow-2xl">
        <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
           <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
           </svg>
        </div>

        <h1 className="font-magic text-5xl text-red-500 mb-2 text-center">Admin Portal</h1>
        <p className="text-zinc-500 font-bold mb-8 uppercase tracking-widest text-xs">Security Clearance Required</p>

        {error && <p className="text-red-400 mb-6 font-bold text-center bg-red-950/40 w-full py-2 border border-red-500/20 backdrop-blur-md px-4">{error}</p>}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-tighter text-zinc-400">ADMIN EMAIL</label>
            <input 
              type="email" 
              required
              disabled={loading}
              className="w-full h-12 bg-black border border-red-900/40 outline-none px-4 text-white rounded focus:border-red-500 transition-all font-mono"
              placeholder="admin@magicreader.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-tighter text-zinc-400">SECURITY CODE</label>
            <input 
              type="password" 
              required
              disabled={loading}
              className="w-full h-12 bg-black border border-red-900/40 outline-none px-4 text-white rounded focus:border-red-500 transition-all font-mono"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 bg-red-900 hover:bg-red-800 text-white py-4 font-black uppercase tracking-widest rounded shadow-xl transition-all disabled:opacity-50"
          >
            {loading ? 'AUTHENTICATING...' : 'AUTHORIZE'}
          </button>
        </form>

        <button 
          onClick={onSwitchToUserLogin}
          className="mt-8 text-zinc-500 hover:text-white transition-colors uppercase text-[10px] font-bold tracking-widest"
        >
          ← Return to Player Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
