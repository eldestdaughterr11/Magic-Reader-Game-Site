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

function App() {
  const [currentView, setCurrentView] = useState("loading");
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            if (session) {
              if (currentView === "login" || currentView === "signup" || currentView === "loading") setCurrentView("home");
            } else {
              // Only redirect to login if we are currently loading or on a protected view
              // If we are already on 'signup', stay there.
              if (currentView === "loading" || (!["login", "signup"].includes(currentView))) {
                setCurrentView("login");
              }
            }
        } catch (err) {
            console.error(err);
            if (currentView !== "signup") setCurrentView("login");
        }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        if (currentView === "login" || currentView === "signup" || currentView === "loading") setCurrentView("home");
      } else {
        // If logged out, only redirect to login if we're not on the signup page
        if (currentView !== "signup") {
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
    if (["home", "game", "leaderboards", "resources", "about"].includes(viewId)) {
      setCurrentView(viewId);
    }
  };

  const renderHeader = () => {
    if (!session) {
      if (currentView === "loading") return null;
      return (
        <header className="bg-[#77815C] py-4 px-6 flex items-center border-b-4 border-[#5E6847] relative">
          <button className="text-[#E9D5FF] text-4xl font-bold">...</button>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
             <MagicLogo className="scale-75" />
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
    <div className="min-h-screen bg-[#3E2F49] flex flex-col font-sans">
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

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;

