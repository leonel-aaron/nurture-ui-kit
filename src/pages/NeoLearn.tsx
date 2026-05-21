import React from "react";
import { useApp } from "../lib/store";
import { BookOpen, Sparkles, Play, CheckCircle2, Zap, Cpu } from "lucide-react";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

export interface NeoLearnProps {
  onNavigate: (tab: string) => void;
}

export const NeoLearn: React.FC<NeoLearnProps> = () => {
  const { lessons } = useApp();
  
  return (
    <div className="space-y-12 pb-32 animate-in fade-in duration-700">
      <header className="space-y-1 px-2">
        <p className="text-[11px] font-black uppercase tracking-[0.6em] text-primary opacity-50">KNOWLEDGE CORE</p>
        <h1 className="text-6xl font-black tracking-tighter text-gradient leading-none">Learn<span className="text-primary">.</span></h1>
      </header>

      <div className="grid gap-8">
        {lessons.map((lesson) => (
          <Card key={lesson.id} className="glass p-10 rounded-[4.5rem] border-none shadow-premium relative overflow-hidden group cursor-pointer hover:bg-white/60 transition-all border border-primary/5">
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
               {lesson.progress === 100 ? <CheckCircle2 className="w-8 h-8 text-emerald-500" /> : <Play className="w-8 h-8 text-primary" />}
            </div>
            
            <div className="flex items-center gap-10 relative z-10">
              <div className="w-22 h-22 bg-primary/10 rounded-[2.5rem] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-700 border border-primary/5">
                <BookOpen className="w-10 h-10 text-primary" />
              </div>
              <div className="flex-1 space-y-5">
                <div className="space-y-1">
                  <Badge variant="outline" className="bg-primary/5 border-primary/10 text-[9px] font-black uppercase tracking-widest py-1 px-4">{lesson.category}</Badge>
                  <h3 className="font-black text-2xl tracking-tight leading-none pt-2">{lesson.title}</h3>
                </div>
                <div className="space-y-3">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] opacity-40 px-1">
                      <span>Neural Progress</span>
                      <span className="tabular-nums">{lesson.progress}%</span>
                   </div>
                   <Progress value={lesson.progress} className="h-3 rounded-full bg-primary/5" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-primary p-12 rounded-[5rem] border-none shadow-2xl relative overflow-hidden text-center group cursor-pointer border border-white/10 shadow-inner">
         <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
         <Sparkles className="w-10 h-10 text-white mx-auto mb-4" />
         <h3 className="text-2xl font-black text-white">AI Certification</h3>
         <p className="text-white/70 font-medium mb-6 px-6 leading-relaxed">Complete all modules to receive your MamaCare Neural Protocol certification.</p>
         <Button variant="ghost" className="rounded-full font-black text-[10px] uppercase tracking-widest gap-2 text-white border-white/20">View Achievement Hub <Zap className="w-4 h-4" /></Button>
      </Card>
    </div>
  );
};