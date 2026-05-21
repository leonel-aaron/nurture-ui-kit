import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  MessageCircle, 
  User as UserIcon, 
  Sparkles, 
  Activity,
  ShieldAlert
} from 'lucide-react';

interface NavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Core' },
    { id: 'health', icon: Activity, label: 'Bio' },
    { id: 'assistant', icon: MessageCircle, label: 'Neural', special: true },
    { id: 'community', icon: Users, label: 'Hive' },
    { id: 'profile', icon: UserIcon, label: 'Vault' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-dark h-32 px-4 flex flex-col items-center justify-center pb-8 z-50 max-w-md mx-auto rounded-t-[4.5rem] shadow-[0_-25px_60px_-15px_rgba(0,210,211,0.3)] border-t border-white/5 transition-all duration-700">
      <div className="flex items-center justify-between w-full px-6 relative">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          if (tab.special) {
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative -top-16 flex flex-col items-center group transition-all duration-700"
              >
                <motion.div 
                  whileHover={{ scale: 1.15, rotate: 5, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-24 h-24 rounded-[3.2rem] flex items-center justify-center shadow-2xl transition-all duration-500 border-4 border-white/5 ${
                    isActive 
                      ? 'bg-[#00D2D3] text-white scale-110 shadow-[#00D2D3]/40 rotate-[360deg]' 
                      : 'bg-white dark:bg-slate-800 text-[#00D2D3] group-hover:bg-[#00D2D3] group-hover:text-white'
                  }`}
                >
                  <Sparkles className={`w-12 h-12 ${isActive ? 'animate-pulse' : ''}`} />
                  <div className="absolute inset-0 bg-white/20 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
                <span className={`text-[11px] font-black uppercase tracking-[0.3em] mt-5 transition-all duration-500 ${isActive ? 'text-[#00D2D3] scale-110' : 'text-muted-foreground/30'}`}>
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center gap-2 relative flex-1 group py-4"
            >
              <div className={`p-4 rounded-[2rem] transition-all duration-500 relative ${
                isActive 
                  ? 'bg-[#00D2D3]/10 text-[#00D2D3] scale-110 shadow-inner border border-[#00D2D3]/10' 
                  : 'text-muted-foreground/20 group-hover:text-[#00D2D3]/60 group-hover:scale-105'
              }`}>
                {isActive && (
                  <motion.div
                    layoutId="nav-bg-glow-node"
                    className="absolute inset-0 bg-[#00D2D3]/5 rounded-[2rem] blur-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
                  />
                )}
                <Icon className={`w-6 h-6 relative z-10 transition-all duration-500 ${isActive ? 'stroke-[3px]' : 'group-hover:rotate-12'}`} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-500 ${isActive ? 'text-[#00D2D3] opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-30'}`}>
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="active-dot-protocol-v10"
                  className="w-1.5 h-1.5 bg-[#00D2D3] rounded-full absolute bottom-[-6px] shadow-lg shadow-[#00D2D3]/50"
                />
              )}
            </button>
          );
        })}
      </div>
      
      <div className="absolute bottom-2 text-[7px] font-black uppercase tracking-[1em] opacity-10 pointer-events-none italic">
        MAMACARE SECURE CORE
      </div>
    </nav>
  );
};