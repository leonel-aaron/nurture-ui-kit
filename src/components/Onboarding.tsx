import React, { useState } from 'react';
import { useApp } from '../lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Heart, Brain, ShieldCheck, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

export const Onboarding: React.FC = () => {
  const { setUser } = useApp();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');

  const steps = [
    {
      title: "Welcome to MamaCare",
      description: "Discover the futuristic AI ecosystem transforming maternal healthcare.",
      icon: Sparkles,
      color: "text-[#00D2D3]",
      bg: "bg-[#00D2D3]/10"
    },
    {
      title: "Biometric Synergy",
      description: "Smart health monitoring and real-time biometric tracking at your node.",
      icon: ShieldCheck,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "AI Neural Core",
      description: "Engineered by Leonel Aaron to provide expert emotional and medical support.",
      icon: Brain,
      color: "text-[#00D2D3]",
      bg: "bg-[#00D2D3]/10"
    }
  ];

  const handleFinish = () => {
    if (name && dueDate) {
      setUser({
        name,
        dueDate,
        email: 'secured@mamacare.ai',
        startDate: new Date().toISOString(),
        isOnboarded: true,
        wellnessScore: 98,
        pregnancyWeek: 24,
        isAdmin: false
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-[500] flex flex-col p-8 overflow-y-auto max-w-md mx-auto font-sans bg-premium-gradient">
      <div className="flex-1 flex flex-col justify-center space-y-12">
        <AnimatePresence mode="wait">
          {step < 3 ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-12 text-center"
            >
              <div className="relative mx-auto w-56 h-56">
                <div className={`absolute inset-0 ${steps[step].bg} rounded-[5rem] blur-[50px] animate-pulse`} />
                <div className="relative w-full h-full bg-white dark:bg-card rounded-[5rem] flex items-center justify-center shadow-2xl border border-white/40 backdrop-blur-3xl group">
                  {React.createElement(steps[step].icon, { className: `w-28 h-28 ${steps[step].color} transition-transform duration-1000 group-hover:scale-110` })}
                </div>
              </div>

              <div className="space-y-6">
                <Badge variant="outline" className="rounded-full px-8 py-2 font-black uppercase tracking-[0.4em] text-[10px] opacity-40 border-primary/20">
                  Protocol {step + 1} / 4
                </Badge>
                <h1 className="text-5xl font-black tracking-tighter leading-tight text-gradient">{steps[step].title}</h1>
                <p className="text-muted-foreground font-medium text-xl leading-relaxed italic opacity-80 px-4">
                  "{steps[step].description}"
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <h1 className="text-5xl font-black tracking-tighter leading-tight text-gradient">Identity Sync</h1>
                <p className="text-muted-foreground font-bold italic text-lg opacity-60 px-6">Synchronize your persona with the core ecosystem matrix.</p>
              </div>

              <div className="space-y-10">
                <div className="space-y-3 px-2">
                  <label className="text-[11px] font-black uppercase tracking-[0.4em] text-[#00D2D3] ml-6 opacity-60 font-sans">Legal Persona Name</label>
                  <Input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Input Identity..." 
                    className="h-20 rounded-[2.5rem] glass border-none px-10 text-xl font-bold shadow-premium focus-visible:ring-[#00D2D3]/20 transition-all italic"
                  />
                </div>
                <div className="space-y-3 px-2">
                  <label className="text-[11px] font-black uppercase tracking-[0.4em] text-[#00D2D3] ml-6 opacity-60">Timeline Due Date</label>
                  <Input 
                    type="date" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)} 
                    className="h-20 rounded-[2.5rem] glass border-none px-10 text-xl font-bold shadow-premium focus-visible:ring-[#00D2D3]/20 transition-all uppercase"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="py-12 space-y-8">
        {step < 3 ? (
          <Button 
            onClick={() => setStep(step + 1)}
            className="w-full h-22 rounded-[3.2rem] bg-[#00D2D3] text-white font-black text-2xl gap-6 shadow-2xl shadow-[#00D2D3]/40 transition-all hover:scale-[1.03] active:scale-95 group overflow-hidden relative border border-white/10"
          >
            <span className="relative z-10 flex items-center gap-4 uppercase tracking-widest">Next Phase <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-500" /></span>
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </Button>
        ) : (
          <Button 
            onClick={handleFinish}
            disabled={!name || !dueDate}
            className="w-full h-22 rounded-[3.2rem] bg-[#00D2D3] text-white font-black text-2xl gap-6 shadow-2xl shadow-[#00D2D3]/40 transition-all hover:scale-[1.03] active:scale-95 disabled:opacity-50 group border border-white/10"
          >
            Initiate Ecosystem <Zap className="w-8 h-8 fill-white animate-pulse" />
          </Button>
        )}
        
        <div className="text-center space-y-3 opacity-20">
          <p className="text-[9px] font-black uppercase tracking-[0.8em]">
            MamaCare Technologies Secure Node
          </p>
          <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-primary">
            ENGINEERED BY LEONEL AARON v10.0
          </p>
        </div>
      </div>
    </div>
  );
};