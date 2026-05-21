import React, { useState } from 'react';
import { useApp } from '../lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Smile, 
  Meh, 
  Frown, 
  Heart, 
  Star, 
  Calendar as CalIcon, 
  Image as ImageIcon, 
  ChevronDown, 
  Sparkles,
  Lock,
  Zap
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

export const Journal: React.FC = () => {
  const { journal, addJournalEntry } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<'happy' | 'neutral' | 'tired' | 'sad' | 'excited'>('happy');

  const moods = [
    { id: 'happy', icon: Smile, label: 'Optimal', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'excited', icon: Heart, label: 'Peak', color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { id: 'neutral', icon: Meh, label: 'Balanced', color: 'text-sky-500', bg: 'bg-sky-500/10' },
    { id: 'tired', icon: Star, label: 'Low-Core', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 'sad', icon: Frown, label: 'System-L', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  ] as const;

  const handleSubmit = () => {
    if (!content.trim()) return;
    addJournalEntry({ content, mood });
    setContent('');
    setIsAdding(false);
    toast.success("Moment saved protocol! Identity secured. ✨");
  };

  return (
    <div className="space-y-12 pb-32 animate-in fade-in duration-700">
      <header className="flex items-center justify-between px-2">
        <div className="space-y-1">
          <p className="text-[11px] font-black uppercase tracking-[0.6em] text-primary opacity-50">MEMORY VAULT</p>
          <h1 className="text-6xl font-black tracking-tighter text-gradient leading-none">Journal<span className="text-primary">.</span></h1>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(!isAdding)}
          className={`w-18 h-18 rounded-[2.2rem] flex items-center justify-center shadow-premium transition-all duration-500 border-4 border-white/20 ${
            isAdding ? 'bg-rose-500 text-white' : 'bg-primary text-white shadow-primary/30'
          }`}
        >
          <Plus className={`w-10 h-10 transition-transform duration-700 ${isAdding ? 'rotate-45' : ''}`} />
        </motion.button>
      </header>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: -30, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -30, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="glass p-10 rounded-[4.5rem] border-none shadow-2xl space-y-10 border border-primary/5">
              <div className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                  <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                  <label className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">Identity Status</label>
                </div>
                <div className="flex justify-between gap-4 overflow-x-auto no-scrollbar pb-4 px-1">
                  {moods.map((m) => {
                    const Icon = m.icon;
                    const isActive = mood === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setMood(m.id)}
                        className={`
                          flex flex-col items-center gap-3 p-6 min-w-[90px] rounded-[2.5rem] transition-all duration-500
                          ${isActive ? `${m.bg} ${m.color} scale-110 shadow-xl border border-current/20` : 'glass grayscale opacity-30'}
                        `}
                      >
                        <Icon className="w-10 h-10" />
                        <span className="text-[9px] font-black uppercase tracking-widest">{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <div className="space-y-4">
                <Textarea 
                  placeholder="Encrypting your thoughts... Record today's protocol."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[250px] rounded-[3rem] border-none glass focus-visible:ring-primary/20 text-xl font-medium px-10 py-10 shadow-inner italic"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <Button variant="ghost" className="h-20 rounded-[2.5rem] glass border-none font-black text-xs gap-3 active:scale-95 transition-all">
                  <ImageIcon className="w-6 h-6 text-primary" /> Visual
                </Button>
                <Button onClick={handleSubmit} className="h-20 rounded-[2.5rem] bg-primary text-white font-black text-xl shadow-2xl shadow-primary/30 col-span-2 gap-4 active:scale-95 transition-all">
                  Sync Vault <Zap className="w-6 h-6 fill-white" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-10">
        {journal.length === 0 && !isAdding ? (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-8 group">
            <div className="relative">
               <div className="absolute inset-0 bg-primary/5 blur-[50px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
               <div className="w-40 h-40 bg-primary/5 rounded-[4.5rem] flex items-center justify-center animate-pulse shadow-inner border border-primary/10 relative z-10">
                 <Lock className="w-18 h-18 text-primary/20" />
               </div>
            </div>
            <div className="space-y-3 px-8 relative z-10">
              <h2 className="text-3xl font-black tracking-tight leading-none italic">"Your Journey is Secure."</h2>
              <p className="text-muted-foreground font-medium text-lg italic opacity-60">Record your first neural snapshot to begin the memory sequence.</p>
            </div>
            <Button variant="outline" className="h-18 rounded-[2rem] font-black px-12 border-2 border-primary/20 hover:bg-primary/5 active:scale-95 transition-all" onClick={() => setIsAdding(true)}>
              Initiate First Protocol
            </Button>
          </div>
        ) : (
          journal.map((entry, idx) => {
            const currentMood = moods.find(m => m.id === entry.mood);
            const MoodIcon = currentMood?.icon || Smile;
            return (
              <motion.div 
                key={entry.id} 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="glass p-10 rounded-[4.5rem] border-none shadow-premium space-y-8 relative group overflow-hidden border border-primary/5">
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-6">
                      <div className={`w-18 h-18 rounded-[2.2rem] flex items-center justify-center shadow-inner ${currentMood?.bg} ${currentMood?.color} border border-current/10`}>
                        <MoodIcon className="w-9 h-9" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-black text-2xl tracking-tighter leading-none">
                          {new Date(entry.date).toLocaleDateString()}
                        </h4>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${currentMood?.color}`}>{currentMood?.label} Protocol</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xl font-medium italic opacity-80 pl-4 border-l-4 border-primary/10 leading-relaxed">
                    "{entry.content}"
                  </p>
                </Card>
              </motion.div>
            );
          })
        )}
      </div>

      <div className="text-center opacity-20 py-10">
        <p className="text-[10px] font-black uppercase tracking-[0.5em]">Memory Encryption: Active</p>
      </div>
    </div>
  );
};