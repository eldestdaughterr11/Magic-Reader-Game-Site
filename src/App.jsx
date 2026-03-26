import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import HomeView from "./components/HomeView";
import GameView from "./components/GameView";
import LeaderboardView from "./components/LeaderboardView";
import ResourcesView from "./components/ResourcesView";
import AboutView from "./components/AboutView";
import MagicLogo from "./components/MagicLogo";
import { supabase } from "./lib/supabaseClient";

import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [currentView, setCurrentView] = useState("loading");
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
        try {
            const { data: { session: initialSession } } = await supabase.auth.getSession();
            setSession(initialSession);
            
            if (initialSession) {
              // Check if admin
              const adminStatus = initialSession.user?.email === 'admin@magicreader.com';
              setIsAdmin(adminStatus);
              
              if (currentView === "login" || currentView === "signup" || currentView === "loading" || currentView === "admin-login") {
                setCurrentView(adminStatus ? "admin-dashboard" : "home");
              }
            } else {
              if (currentView === "loading" || (!["login", "signup", "admin-login"].includes(currentView))) {
                setCurrentView("login");
              }
            }
        } catch (err) {
            console.error(err);
            if (!["signup", "admin-login"].includes(currentView)) setCurrentView("login");
        }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession) {
        const adminStatus = newSession.user?.email === 'admin@magicreader.com';
        setIsAdmin(adminStatus);
        
        if (currentView === "login" || currentView === "signup" || currentView === "loading" || currentView === "admin-login") {
          setCurrentView(adminStatus ? "admin-dashboard" : "home");
        }
      } else {
        setIsAdmin(false);
        if (currentView !== "signup" && currentView !== "admin-login") {
          setCurrentView("login");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [currentView]);

  const handleLoginSuccess = (user) => {
    // Session is handled by onAuthStateChange
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleNavigate = (viewId) => {
    if (viewId === "logout") {
        handleLogout();
        return;
    }
    // Access control: Don't let normal users go to admin dashboard
    if (viewId === "admin-dashboard" && !isAdmin) {
        setCurrentView("home");
        return;
    }
    setCurrentView(viewId);
  };

  const renderHeader = () => {
    if (currentView === "admin-dashboard") return null; // No navbar for admin for now
    
    if (!session) {
      if (["loading", "admin-login"].includes(currentView)) return null;
      return (
        <header className="bg-[#77815C] py-4 px-6 flex items-center border-b-4 border-[#5E6847] relative">
          <button className="text-[#E9D5FF] text-2xl md:text-4xl font-bold">...</button>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
             <MagicLogo className="scale-[0.5] md:scale-75" />
          </div>
        </header>
      );
    }
    return <Navbar onNavigate={handleNavigate} />;
  };

  if (currentView === "loading") {
    return (
        <div className="min-h-screen bg-[#3E2F49] flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#E9D5FF]"></div>
        </div>
    );
  }

  const currentUser = { 
    id: session?.user?.id,
    username: session?.user?.user_metadata?.username || session?.user?.email,
    email: session?.user?.email 
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans ${currentView === 'admin-dashboard' || currentView === 'admin-login' ? 'bg-black' : 'bg-[#3E2F49]'}`}>
      {renderHeader()}

      <main className="flex-grow">
        {currentView === "login" && (
          <LoginForm 
            onLoginSuccess={handleLoginSuccess} 
            onSwitchToSignUp={() => setCurrentView("signup")} 
          />
        )}
        {currentView === "signup" && (
          <SignUpForm 
            onSignUpSuccess={() => setCurrentView("login")} 
            onSwitchToLogin={() => setCurrentView("login")} 
          />
        )}
        {currentView === "admin-login" && (
          <AdminLogin 
            onLoginSuccess={handleLoginSuccess}
            onSwitchToUserLogin={() => setCurrentView("login")}
          />
        )}
        {currentView === "admin-dashboard" && (
          <AdminDashboard user={currentUser} />
        )}
        {currentView === "home" && (
          <HomeView user={currentUser} />
        )}
        {currentView === "game" && (
          <GameView user={currentUser} />
        )}
        {currentView === "leaderboards" && (
          <LeaderboardView />
        )}
        
        {currentView === "resources" && (
          <ResourcesView />
        )}
        
        {currentView === "about" && (
          <AboutView />
        )}
      </main>

      {/* Conditional Footer for Admin Access */}
      {!session && currentView === 'login' && (
        <div className="bg-[#3E2F49] pb-8 text-center">
            <button 
                onClick={() => setCurrentView('admin-login')}
                className="text-[10px] text-white/20 hover:text-red-500/50 uppercase font-black tracking-widest transition-colors"
            >
                Staff Entry — Authorized Only
            </button>
        </div>
      )}

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;


