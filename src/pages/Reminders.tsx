import React from "react";
import { useApp } from "../lib/store";
import { Bell, Clock, Zap, ShieldCheck, Trash2 } from "lucide-react";
import { Card } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

export const Reminders: React.FC = () => {
  const { reminders, toggleReminder, deleteReminder } = useApp();
  return (
    <div className="space-y-12 pb-32 animate-in fade-in duration-700">
      <header className="space-y-1 px-2">
        <p className="text-[11px] font-black uppercase tracking-[0.6em] text-primary opacity-50">SYNC LOGS</p>
        <h1 className="text-6xl font-black tracking-tighter text-gradient leading-none">Protocols<span className="text-primary">.</span></h1>
      </header>

      <div className="space-y-6">
        {reminders.map((r, idx) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="glass p-8 rounded-[3.5rem] border-none shadow-premium flex items-center justify-between group hover:bg-white/60 transition-all border border-primary/5">
              <div className="flex items-center gap-8">
                <div className={`w-18 h-18 rounded-[2.2rem] flex items-center justify-center shadow-inner transition-all group-hover:scale-110 border border-primary/5 ${r.completed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'}`}>
                  <Bell className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className={`font-black text-2xl tracking-tighter leading-none ${r.completed ? 'opacity-40 line-through' : ''}`}>{r.title}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-[10px] font-bold opacity-40 flex items-center gap-2 uppercase tracking-widest tabular-nums italic">
                       <Clock className="w-3.5 h-3.5" /> {r.time} Sync
                    </p>
                    {r.completed && <Badge className="bg-emerald-500 text-white h-5 text-[8px] px-3 font-black border-none">EXECUTED</Badge>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Checkbox 
                  checked={r.completed} 
                  onCheckedChange={() => toggleReminder(r.id)} 
                  className="h-10 w-10 rounded-[1.2rem] border-2 border-primary/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all shadow-lg" 
                />
                <Button variant="ghost" size="icon" onClick={() => deleteReminder(r.id)} className="h-10 w-10 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="glass p-10 rounded-[4rem] border-none shadow-inner bg-primary/5 flex items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-1000">
         <ShieldCheck className="w-10 h-10 text-primary" />
         <p className="text-sm font-bold uppercase tracking-widest leading-relaxed">Identity encryption protocols are active for all daily syncs.</p>
      </Card>
    </div>
  );
};