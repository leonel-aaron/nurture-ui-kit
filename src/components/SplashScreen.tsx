import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 4000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-[1000] overflow-hidden">
      {/* Luxurious Background Effects */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        <div className="absolute top-[-10%] right-[-10%] w-[120%] h-[120%] bg-primary/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[120%] h-[120%] bg-secondary/5 rounded-full blur-[150px] animate-pulse" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center space-y-12">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            damping: 20, 
            stiffness: 100,
            delay: 0.5 
          }}
          className="relative"
        >
          <div className="w-40 h-40 bg-white dark:bg-card rounded-[3.5rem] shadow-2xl flex items-center justify-center relative overflow-hidden group border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 group-hover:opacity-50 transition-opacity" />
            <Sparkles className="w-20 h-20 text-primary relative z-10" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute -bottom-6 -right-6 w-16 h-16 bg-white dark:bg-card rounded-3xl shadow-xl flex items-center justify-center border border-white/20"
          >
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500/20" />
          </motion.div>
        </motion.div>

        <div className="text-center space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="text-5xl font-black tracking-tight leading-none"
          >
            MamaCare<span className="text-primary">.</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="space-y-1"
          >
            <p className="text-muted-foreground font-black text-[10px] uppercase tracking-[0.4em]">Next-Gen Maternal Platform</p>
            <p className="text-primary font-black text-[8px] uppercase tracking-[0.2em] pt-4 opacity-60">African Visionary Innovation</p>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-16 text-center space-y-4"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-1 bg-muted/30 rounded-full overflow-hidden">
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 1.5, delay: 2.5 }}
              className="h-full bg-primary"
            />
          </div>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30">
            Powered by MamaCare Technologies
          </p>
        </div>
      </motion.div>
    </div>
  );
};