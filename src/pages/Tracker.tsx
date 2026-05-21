import React from "react";
import { Baby, Ruler, Scale, Activity, Sparkles, Zap, Smartphone, LineChart } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { motion } from "framer-motion";

export const Tracker: React.FC = () => {
  const currentWeek = 24;
  return (
    <div className="space-y-12 pb-32 animate-in fade-in duration-700">
      <header className="space-y-1 px-2">
        <p className="text-[11px] font-black uppercase tracking-[0.6em] text-primary opacity-50">TIMELINE PROTOCOL</p>
        <h1 className="text-6xl font-black tracking-tighter text-gradient leading-none">Voyage<span className="text-primary">.</span></h1>
      </header>

      <Card className="glass p-12 rounded-[5rem] border-none shadow-premium space-y-12 relative overflow-hidden group border border-primary/5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -mr-40 -mt-40" />
        
        <div className="flex flex-col items-center text-center space-y-10 relative z-10">
          <div className="relative">
             <div className="absolute inset-0 bg-primary/10 blur-[60px] rounded-full animate-pulse" />
             <div className="w-56 h-56 rounded-[4.5rem] bg-white dark:bg-card border-8 border-white/50 dark:border-white/5 shadow-2xl relative z-10 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000" 
                  alt="Neural Growth" 
                  className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-1000"
                />
             </div>
          </div>
          
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary border-none rounded-full px-8 py-2 font-black uppercase text-[11px] tracking-widest">
              NEURAL SNAPSHOT
            </Badge>
            <h2 className="text-6xl font-black tracking-tighter leading-none tabular-nums">Week {currentWeek}</h2>
            <p className="text-xl font-bold text-muted-foreground italic leading-none">"PROTOCOL: MANGO SIZED"</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 relative z-10">
          <div className="glass p-8 rounded-[3.5rem] border-none flex flex-col items-center gap-4 shadow-inner group border border-primary/5 hover:bg-white/60 transition-all">
            <Ruler className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
            <div className="text-center">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block opacity-40">Dimension</span>
              <span className="text-3xl font-black tabular-nums tracking-tighter">30.2 cm</span>
            </div>
          </div>
          <div className="glass p-8 rounded-[3.5rem] border-none flex flex-col items-center gap-4 shadow-inner group border border-primary/5 hover:bg-white/60 transition-all">
            <Scale className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
            <div className="text-center">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block opacity-40">Mass</span>
              <span className="text-3xl font-black tabular-nums tracking-tighter">600 g</span>
            </div>
          </div>
        </div>

        <div className="space-y-10 relative z-10">
          <div className="space-y-4 px-4 border-l-4 border-primary/20">
             <h3 className="font-black text-[12px] uppercase tracking-[0.4em] opacity-30">Biological Logs</h3>
             <p className="text-xl font-medium leading-relaxed italic text-foreground/80">
               "Neural pathways are expanding. Auditory nodes active. Light protocols detectable through optic layers."
             </p>
          </div>

          <Card className="bg-primary/5 p-10 rounded-[3.5rem] border border-primary/10 flex items-start gap-6">
             <Zap className="w-8 h-8 text-primary shrink-0" />
             <div className="space-y-2">
                <span className="font-black uppercase tracking-widest text-[10px] text-primary">Core Advice</span>
                <p className="text-base font-bold leading-relaxed text-primary/80">
                  Optimization protocol: High-fidelity audio interaction. Voice synthesis recommended for bonding calibration.
                </p>
             </div>
          </Card>
        </div>
      </Card>
      
      <div className="flex justify-center gap-10 pt-10 opacity-10">
         <Activity className="w-8 h-8" />
         <Smartphone className="w-8 h-8" />
         <LineChart className="w-8 h-8" />
      </div>
    </div>
  );
};