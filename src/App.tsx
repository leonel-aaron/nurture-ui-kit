import React, { useState } from 'react';
import { useApp, AppProvider } from './lib/store';
import { Toaster } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { SplashScreen } from './components/SplashScreen';
import { Onboarding } from './components/Onboarding';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Tracker } from './pages/Tracker';
import { Journal } from './pages/Journal';
import { Community } from './pages/Community';
import { AIAssistant } from './pages/AIAssistant';
import { Profile } from './pages/Profile';
import { Reminders } from './pages/Reminders';
import { NeoLearn } from './pages/NeoLearn';
import { Health } from './pages/Health';
import { AlertCircle, ShieldAlert, Phone, Activity } from 'lucide-react';
import { Button } from './components/ui/button';

const AppContent: React.FC = () => {
  const { user, isDarkMode } = useApp();
  const [isSplashActive, setIsSplashActive] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [showEmergency, setShowEmergency] = useState(false);

  if (isSplashActive) {
    return <SplashScreen onFinish={() => setIsSplashActive(false)} />;
  }

  if (!user || !user.isOnboarded) {
    return <Onboarding />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home onNavigate={setActiveTab} />;
      case 'tracker': return <Tracker />;
      case 'journal': return <Journal />;
      case 'community': return <Community />;
      case 'assistant': return <AIAssistant />;
      case 'neolearn': return <NeoLearn onNavigate={setActiveTab} />;
      case 'profile': return <Profile />;
      case 'health': return <Health />;
      case 'reminders': return <Reminders />;
      default: return <Home onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${isDarkMode ? 'dark bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} selection:bg-[#00D2D3]/20 selection:text-[#00D2D3]`}>
      <div className="max-w-md mx-auto min-h-screen flex flex-col relative px-6 overflow-x-hidden font-sans bg-premium-gradient">
        
        {/* Futurist Ambient Gradients */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[50%] bg-[#00D2D3]/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[40%] bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
        </div>

        <main className="flex-1 py-12 relative z-10 pb-40">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.98 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        <div className="fixed top-12 right-6 z-[100]">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button 
              variant="destructive" 
              size="icon" 
              className="rounded-[1.5rem] w-14 h-14 bg-rose-500 border-4 border-white dark:border-slate-900 shadow-2xl shadow-rose-500/40 active:scale-90 transition-transform relative overflow-hidden group"
              onClick={() => setShowEmergency(true)}
            >
               <div className="absolute inset-0 bg-white/20 animate-ping opacity-20" />
              <AlertCircle className="w-8 h-8 relative z-10" />
            </Button>
          </motion.div>
        </div>

        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Emergency Modal Protocol */}
        <AnimatePresence>
          {showEmergency && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="fixed inset-0 z-[1000] bg-slate-950/80 backdrop-blur-2xl flex items-end justify-center p-6"
            >
              <motion.div 
                initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} 
                className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[4rem] p-12 space-y-10 shadow-2xl border border-white/20 relative overflow-hidden"
              >
                 <div className="absolute top-0 left-0 w-full h-2 bg-rose-500" />
                <div className="text-center space-y-6 relative">
                  <div className="w-24 h-24 bg-rose-500/10 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner border border-rose-500/20">
                    <ShieldAlert className="w-12 h-12 text-rose-500" />
                  </div>
                  <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white">Emergency</h2>
                  <p className="text-muted-foreground font-bold text-sm leading-relaxed px-4 italic">"Neural protocols for bio-security are active. Your physician node is being signaled."</p>
                </div>
                <div className="space-y-6">
                  <Button className="w-full h-20 rounded-[2.5rem] bg-rose-500 text-white font-black text-2xl gap-4 shadow-xl shadow-rose-500/30 group" onClick={() => window.open('tel:15')}>
                    <Phone className="w-7 h-7 fill-white" /> SIGNAL SAMU (15)
                  </Button>
                  <Button variant="outline" className="w-full h-20 rounded-[2.5rem] font-black text-xl gap-4 border-2 active:scale-95 transition-transform" onClick={() => setShowEmergency(false)}>
                    DISMISS PROTOCOL
                  </Button>
                </div>
                <div className="text-center opacity-30 text-[9px] font-black uppercase tracking-[0.4em]">
                  MamaCare Secure Ecosystem Core
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Toaster position="top-center" richColors closeButton theme={isDarkMode ? 'dark' : 'light'} />
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;