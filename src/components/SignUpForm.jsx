import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const SignUpForm = ({ onSignUpSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
        // Supabase SignUp
        const { data, error: signUpError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
              data: {
                username: formData.username,
              }
            }
        });

        if (signUpError) throw signUpError;
        
        // Log out immediately after signup 
        // to prevent auto-login and force them to manual login
        await supabase.auth.signOut();

        onSignUpSuccess && onSignUpSuccess();
    } catch (err) {
        setError(err.message || "An error occurred during sign up.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] px-4 py-12 overflow-hidden bg-[#1E1428]">
      {/* Enhanced Magical Background */}
      <div className="absolute inset-0 z-0">
        {/* Deep base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E1428] via-[#3E2F49] to-[#2D1E3A]"></div>
        
        {/* Vibrant Mist Effects (Pink/Purple) */}
        <div className="absolute top-0 left-0 w-full h-full opacity-40 mix-blend-screen overflow-hidden">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-pink-500/30 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-500/30 rounded-full blur-[120px] animate-pulse delay-700"></div>
          <div className="absolute -bottom-[10%] left-[20%] w-[70%] h-[50%] bg-blue-500/20 rounded-full blur-[120px]"></div>
        </div>

        {/* Stardust/Sparkle Overlay */}
        <div className="absolute inset-0 opacity-60 mix-blend-screen pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        
        {/* Subtle glowing orbs */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white rounded-full blur-[4px] animate-ping"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-yellow-200 rounded-full blur-[3px] animate-ping delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white rounded-full blur-[2px] animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        <h1 className="font-magic text-6xl text-white mb-2 text-center drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
          Create New Account
        </h1>
        
        <p className="text-xl font-bold mb-10 text-white/90">
          Already Registered? <button onClick={onSwitchToLogin} className="underline hover:text-purple-300 transition-colors">Login</button>
        </p>

        {error && <p className="text-red-400 mb-6 font-bold text-center bg-black/40 w-full py-2 border border-red-400/20 backdrop-blur-md">{error}</p>}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-xl font-black uppercase tracking-tighter text-white drop-shadow-md">NAME</label>
            <input 
              type="text" 
              required
              disabled={loading}
              className="w-full h-14 bg-white outline-none px-6 text-black text-xl rounded-sm focus:ring-4 focus:ring-purple-400/50 transition-all font-bold placeholder:text-gray-300 shadow-xl"
              placeholder="Your Name"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xl font-black uppercase tracking-tighter text-white drop-shadow-md">EMAIL</label>
            <input 
              type="email" 
              required
              disabled={loading}
              className="w-full h-14 bg-white outline-none px-6 text-black text-xl rounded-sm focus:ring-4 focus:ring-purple-400/50 transition-all font-bold placeholder:text-gray-300 shadow-xl"
              placeholder="youremail@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xl font-black uppercase tracking-tighter text-white drop-shadow-md">PASSWORD</label>
            <input 
              type="password" 
              required
              disabled={loading}
              className="w-full h-14 bg-white outline-none px-6 text-black text-xl rounded-sm focus:ring-4 focus:ring-purple-400/50 transition-all font-bold placeholder:text-gray-300 shadow-xl"
              placeholder="********"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-6 bg-[#2D1E3A] hover:bg-[#1E1428] text-white py-4 px-16 text-xs font-black uppercase tracking-[0.2em] rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.4)] transform hover:-translate-y-1 active:translate-y-0 transition-all self-center disabled:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'PROCESSING...' : 'SIGN UP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
