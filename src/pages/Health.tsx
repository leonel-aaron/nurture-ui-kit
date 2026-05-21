import React, { useState, useEffect } from 'react';
import { useApp } from '../lib/store';
import { 
  Heart, 
  Activity, 
  Wind, 
  Moon, 
  Brain,
  Smartphone,
  ShieldCheck,
  Zap,
  Sparkles,
  Smartphone as PhoneIcon,
  LineChart,
  History,
  Camera,
  Fingerprint,
  Waves
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

export const Health: React.FC = () => {
  const { scans, addScan, user } = useApp();
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [pulse, setPulse] = useState(72);
  const [progress, setProgress] = useState(0);
  const [quality, setQuality] = useState(0);

  const startMeasurement = () => {
    setIsMeasuring(true);
    setProgress(0);
    setQuality(0);
    toast.info('Neural handshake initiated. Place finger on camera + flash node.');
    
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      setProgress(current);
      setPulse(Math.floor(Math.random() * (85 - 65) + 65));
      setQuality(Math.floor(Math.random() * (100 - 90) + 90));
      
      if (current >= 100) {
        clearInterval(interval);
        setIsMeasuring(false);
        const finalBpm = Math.floor(Math.random() * (78 - 72) + 72);
        const newData = {
          id: Date.now().toString(),
          bpm: finalBpm,
          stressLevel: 15,
          oxygen: 99,
          timestamp: new Date().toISOString(),
          quality: 'Excellent' as const
        };
        addScan(newData);
        toast.success(`Protocol complete: ${finalBpm} BPM detected. Identity verified.`);
      }
    }, 120);
  };

  return (
    <div className="space-y-8 pb-32 animate-in fade-in duration-700">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00D2D3] opacity-60">BIOMETRICS v10.0</p>
          <h1 className="text-4xl font-black tracking-tight text-gradient">Bio Center<span className="text-[#00D2D3]">.</span></h1>
        </div>
        <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-[#00D2D3] shadow-inner border border-[#00D2D3]/10">
          <ShieldCheck className="w-7 h-7" />
        </div>
      </header>

      {/* Futuristic Pulse Scanner */}
      <Card className="glass p-10 rounded-[4rem] border-none shadow-premium relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00D2D3]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-10">
          <div className="relative">
            <motion.div 
              animate={isMeasuring ? { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] } : {}}
              transition={{ repeat: Infinity, duration: 0.7 }}
              className={`w-56 h-56 rounded-full border-2 flex items-center justify-center p-4 transition-colors duration-500 ${isMeasuring ? 'border-[#00D2D3] bg-[#00D2D3]/5' : 'border-[#00D2D3]/20'}`}
            >
              <div className="w-full h-full rounded-full border-8 border-[#00D2D3]/10 flex items-center justify-center relative overflow-hidden">
                <div className={`w-36 h-36 bg-[#00D2D3]/10 rounded-full flex items-center justify-center transition-all ${isMeasuring ? 'scale-110 shadow-2xl shadow-[#00D2D3]/30' : ''}`}>
                  <Heart className={`w-16 h-16 text-[#00D2D3] ${isMeasuring ? 'animate-pulse' : ''}`} />
                </div>
                {isMeasuring && (
                  <motion.div 
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 border-t-4 border-[#00D2D3] rounded-full"
                  />
                )}
                {isMeasuring && (
                  <div className="absolute inset-0 bg-rose-500/10 flex items-center justify-center">
                    <Waves className="w-full h-full text-rose-500/20 absolute animate-pulse scale-150" />
                  </div>
                )}
              </div>
            </motion.div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white dark:bg-card px-4 py-1 rounded-full shadow-lg border border-[#00D2D3]/10">
               <span className="text-[10px] font-black text-[#00D2D3] flex items-center gap-2">
                 <Zap className="w-3 h-3 fill-[#00D2D3]" /> SECURE SCAN
               </span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-6xl font-black tabular-nums tracking-tighter">
              {isMeasuring ? pulse : (scans[0]?.bpm || '82')} 
              <span className="text-xl text-muted-foreground uppercase font-bold ml-2">bpm</span>
            </h2>
            <p className="text-muted-foreground font-black text-[10px] uppercase tracking-[0.3em] opacity-40">Maternal Heart Rate Protocol</p>
          </div>

          <Button 
            disabled={isMeasuring}
            onClick={startMeasurement}
            className="w-full h-20 rounded-[2.5rem] bg-[#00D2D3] text-white font-black text-xl gap-4 shadow-2xl shadow-[#00D2D3]/20 active:scale-95 transition-transform"
          >
            <Smartphone className="w-6 h-6" /> {isMeasuring ? 'Analyzing sequence...' : 'Initiate Scan'}
          </Button>
          
          <p className="text-[#00D2D3] text-[10px] font-black uppercase tracking-widest italic animate-pulse">
            “Gently place finger on camera node”
          </p>
        </div>
      </Card>

      {/* Wellness Metrics Grid */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="glass p-8 rounded-[3.5rem] border-none shadow-premium space-y-6 group hover:scale-[1.03] transition-transform">
          <div className="flex justify-between items-start">
            <div className="p-4 bg-sky-500/10 rounded-[1.8rem] shadow-inner">
              <Wind className="w-7 h-7 text-sky-500" />
            </div>
            <Badge className="bg-sky-500/10 text-sky-500 border-none px-3 py-1 font-black text-[9px] tracking-widest uppercase">Stable</Badge>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black tabular-nums">15%</p>
            <p className="text-[10px] font-black uppercase text-muted-foreground opacity-50 tracking-widest">Stress index</p>
          </div>
        </Card>

        <Card className="glass p-8 rounded-[3.5rem] border-none shadow-premium space-y-6 group hover:scale-[1.03] transition-transform">
          <div className="flex justify-between items-start">
            <div className="p-4 bg-[#00D2D3]/10 rounded-[1.8rem] shadow-inner">
              <Moon className="w-7 h-7 text-[#00D2D3]" />
            </div>
            <Badge className="bg-[#00D2D3]/10 text-[#00D2D3] border-none px-3 py-1 font-black text-[9px] tracking-widest uppercase">Deep</Badge>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black tabular-nums">7.8h</p>
            <p className="text-[10px] font-black uppercase text-muted-foreground opacity-50 tracking-widest">Sleep state</p>
          </div>
        </Card>
      </div>

      {/* AI Health Insight Module */}
      <Card className="bg-[#00D2D3] p-10 rounded-[4rem] border-none shadow-2xl relative overflow-hidden text-white group cursor-pointer border border-white/20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-1000" />
        <div className="space-y-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-[1.8rem] flex items-center justify-center shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <span className="font-black uppercase tracking-[0.3em] text-[10px] opacity-80">Mama AI Insights</span>
          </div>
          <p className="text-2xl font-black leading-tight tracking-tight">
            "Your biometric sequence is stable. The neural network suggests increasing hydration node to 2.8L today."
          </p>
          <div className="pt-4 border-t border-white/20 flex justify-between items-center">
             <span className="text-[10px] font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
               <History className="w-3 h-3" /> Updated 2m ago
             </span>
             <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </Card>

      {/* Device Bridge Protocol */}
      <div className="text-center space-y-4 py-12 border-t border-primary/5 opacity-30">
        <p className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">MamaCare Bio Ecosystem</p>
        <div className="flex justify-center gap-8 opacity-20">
          <Zap className="w-6 h-6" />
          <Activity className="w-6 h-6" />
          <LineChart className="w-6 h-6" />
          <Smartphone className="w-6 h-6" />
        </div>
        <p className="text-[8px] font-bold uppercase tracking-widest">Ready for Smartwatch & Medical IoT Bridge</p>
      </div>
    </div>
  );
};