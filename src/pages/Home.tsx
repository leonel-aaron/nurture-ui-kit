import React from 'react';
import { useApp } from '../lib/store';
import { 
  Droplets, 
  Plus, 
  ChevronRight, 
  Bell, 
  Search,
  Baby,
  Brain,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

interface HomeProps {
  onNavigate: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { user, waterIntake, waterGoal, updateWaterIntake } = useApp();
  
  const currentWeek = user?.pregnancyWeek || 24;
  const progressPercent = (currentWeek / 40) * 100;
  
  return (
    <div className="space-y-10 pb-32 animate-in fade-in duration-700">
      {/* Futurist Header */}
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-muted-foreground font-black text-[10px] uppercase tracking-[0.5em] opacity-40">NODE ACTIVE 👋</p>
          <h1 className="text-4xl font-black tracking-tighter leading-none text-gradient">
            {user?.name?.split(' ')[0] || 'MamaCare'}<span className="text-primary">.</span>
          </h1>
        </div>
        <div className="flex gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="w-14 h-14 rounded-[1.8rem] glass flex items-center justify-center relative shadow-premium border border-white/10"
          >
            <Search className="w-5 h-5 text-foreground/50" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="w-14 h-14 rounded-[1.8rem] glass flex items-center justify-center relative shadow-premium border border-white/10"
            onClick={() => onNavigate('reminders')}
          >
            <Bell className="w-5 h-5 text-foreground/50" />
            <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white dark:border-slate-900 shadow-lg" />
          </motion.button>
        </div>
      </header>

      {/* AI Protocol Widget */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative group cursor-pointer"
        onClick={() => onNavigate('assistant')}
      >
        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-[4rem] group-hover:bg-primary/30 transition-all opacity-40" />
        <Card className="bg-primary p-12 rounded-[4.5rem] border-none shadow-2xl shadow-primary/30 text-white overflow-hidden relative border border-white/10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[90px] -mr-40 -mt-40 group-hover:scale-110 transition-transform duration-1000" />
          <div className="relative z-10 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-[2.2rem] flex items-center justify-center shadow-lg border border-white/10">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <span className="font-black uppercase tracking-[0.3em] text-[10px] opacity-80">AI Neural Protocol</span>
              </div>
              <Badge className="bg-white/10 text-white border border-white/20 px-6 py-2 rounded-full font-black text-[10px] tracking-widest uppercase">
                Week {currentWeek}
              </Badge>
            </div>
            
            <p className="text-3xl font-black leading-tight tracking-tight italic">
              "Baby's hearing protocols are calibrating. Optimal time for voice synergy."
            </p>

            <Button 
              variant="ghost" 
              className="w-full h-20 bg-white/10 hover:bg-white/20 text-white rounded-[2.5rem] font-black text-xl gap-4 transition-all duration-300 border border-white/10 active:scale-95"
            >
              Ask Mama AI <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Grid Ecosystem */}
      <div className="grid grid-cols-2 gap-6">
        <Card 
          className="glass p-10 rounded-[4.5rem] col-span-2 border-none shadow-premium relative overflow-hidden group cursor-pointer border border-primary/5"
          onClick={() => onNavigate('tracker')}
        >
          <div className="flex items-center justify-between mb-10 relative z-10">
            <div className="space-y-1">
              <h3 className="text-3xl font-black tracking-tighter text-gradient leading-none">The Journey</h3>
              <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest opacity-40">Biometric Timeline</p>
            </div>
            <div className="w-20 h-20 bg-primary/10 rounded-[2.5rem] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-700">
              <Baby className="w-10 h-10 text-primary" />
            </div>
          </div>

          <div className="relative h-18 bg-primary/5 rounded-full overflow-hidden p-2 shadow-inner border border-primary/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              className="h-full bg-gradient-to-r from-primary via-primary to-secondary rounded-full relative"
            >
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center">
                <div className="w-3 h-3 bg-primary rounded-full animate-ping" />
              </div>
            </motion.div>
          </div>

          <div className="flex justify-between mt-8 items-center px-2">
            <span className="text-primary font-black text-2xl tracking-tighter tabular-nums">{currentWeek} / 40 SEM.</span>
            <div className="flex items-center gap-2 opacity-30">
               <Zap className="w-4 h-4 fill-primary text-primary" />
               <span className="text-[10px] font-black uppercase tracking-widest">Real-time Sync</span>
            </div>
          </div>
        </Card>

        {/* Wellness Matrix */}
        <Card className="glass p-8 rounded-[4rem] border-none shadow-premium flex flex-col items-center justify-center space-y-6 hover:scale-[1.05] transition-transform border border-primary/5 shadow-inner">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="64" cy="64" r="56" className="stroke-primary/10 fill-none" strokeWidth="12" />
              <motion.circle 
                cx="64" cy="64" r="56" 
                className="stroke-primary fill-none" 
                strokeWidth="12" 
                strokeDasharray="351.8"
                initial={{ strokeDashoffset: 351.8 }}
                animate={{ strokeDashoffset: 351.8 * (1 - 0.98) }}
                strokeLinecap="round"
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black tabular-nums tracking-tighter">98</span>
              <span className="text-[9px] font-black uppercase text-muted-foreground opacity-40 tracking-[0.2em]">CORE</span>
            </div>
          </div>
          <span className="font-black text-[11px] uppercase tracking-[0.4em] opacity-40">Bio-Sync</span>
        </Card>

        {/* Hydration Protocol */}
        <Card className="glass p-8 rounded-[4rem] border-none shadow-premium space-y-8 border border-primary/5">
          <div className="flex justify-between items-start">
            <div className="p-4 bg-sky-500/10 rounded-[2rem] shadow-inner">
              <Droplets className="w-8 h-8 text-sky-500" />
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); updateWaterIntake(250); }}
              className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 shadow-premium flex items-center justify-center active:scale-90 hover:scale-110 transition-all border border-white/20"
            >
              <Plus className="w-7 h-7 text-primary" />
            </button>
          </div>
          <div className="space-y-2 px-1">
            <div className="text-4xl font-black tabular-nums tracking-tighter leading-none">{waterIntake}ml</div>
            <p className="text-[10px] font-black uppercase text-muted-foreground opacity-40 tracking-widest leading-none">Target: {waterGoal}ml</p>
          </div>
          <Progress value={(waterIntake / waterGoal) * 100} className="h-2.5 rounded-full bg-sky-100 dark:bg-sky-900/10" />
        </Card>
      </div>

      {/* NeoLearn Hub Entry */}
      <Card 
        className="glass p-12 rounded-[5.5rem] border-none shadow-premium bg-premium-gradient overflow-hidden relative cursor-pointer group border border-primary/5"
        onClick={() => onNavigate('neolearn')}
      >
        <div className="flex items-center gap-10">
          <div className="w-28 h-28 bg-secondary/10 rounded-[3rem] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-1000">
            <Sparkles className="w-14 h-14 text-secondary" />
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-4xl font-black tracking-tighter text-gradient leading-none">Neural Learn</h3>
            <p className="text-muted-foreground font-bold text-base leading-relaxed opacity-60 italic leading-snug">"Advanced maternal protocols supported by the core IA."</p>
          </div>
        </div>
      </Card>

      {/* Ecosystem Footer */}
      <div className="text-center space-y-4 py-16 border-t border-primary/5 opacity-10">
        <p className="text-[12px] font-black uppercase tracking-[1em] text-primary">MAMACARE SECURE CORE</p>
      </div>
    </div>
  );
};