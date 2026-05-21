import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../lib/store';
import { getAIResponse } from '../services/ai';
import { 
  Send, 
  Mic, 
  Sparkles, 
  Trash2,
  BrainCircuit,
  Loader2,
  Volume2,
  VolumeX,
  X,
  Zap,
  Ear,
  AudioLines,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

export const AIAssistant: React.FC = () => {
  const { messages, addMessage, clearMessages, user, scans } = useApp();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- Voice Protocols (Web Speech API) ---
  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    // Use target female voice for "Mama AI" persona
    const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Google UK English Female'));
    if (femaleVoice) utterance.voice = femaleVoice;
    utterance.pitch = 1.1;
    utterance.rate = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const startVoiceHandshake = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error('Neural voice link protocols offline in this node.');
      return;
    }
    // @ts-ignore
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = user?.language === 'fr' ? 'fr-FR' : 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleProtocolSend(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleProtocolSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user' as const,
      timestamp: new Date()
    };

    addMessage(userMessage);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getAIResponse(text, {
        userName: user?.name,
        pregnancyWeek: user?.pregnancyWeek || 24,
        history: messages,
        biometrics: scans[0]
      });

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'ai' as const,
        timestamp: new Date(),
        emotion: response.emotion
      };

      addMessage(aiMessage);
      speak(response.text);
    } catch (error) {
      toast.error("Neural Node timeout. Recalculating protocol.");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)] bg-transparent animate-in fade-in duration-1000">
      {/* Ecosystem Header */}
      <header className="flex items-center justify-between mb-8 shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#00D2D3]/20 rounded-[1.8rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <Avatar className="w-16 h-16 rounded-[1.8rem] border-4 border-white dark:border-card shadow-premium relative z-10">
              <AvatarImage src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000" />
              <AvatarFallback className="bg-[#00D2D3] text-white font-black">AI</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white dark:border-card shadow-lg animate-pulse" />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black tracking-tight leading-none">Mama Assistant</h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-[#00D2D3]/10 text-[#00D2D3] border-none rounded-full px-3 py-0.5 font-bold text-[9px] tracking-widest uppercase">
                NEURAL CORE ACTIVE
              </Badge>
              {isSpeaking && <AudioLines className="w-4 h-4 text-[#00D2D3] animate-pulse" />}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-2xl glass border-none shadow-sm" onClick={() => window.speechSynthesis.cancel()}>
            <VolumeX className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-2xl glass border-none shadow-sm" onClick={clearMessages}>
            <Trash2 className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
      </header>

      {/* Messages Feed */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar pb-10 no-scrollbar"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-10 px-10">
            <div className="relative">
              <div className="absolute inset-0 bg-[#00D2D3]/10 blur-3xl rounded-full scale-150" />
              <div className="w-32 h-32 bg-[#00D2D3]/5 rounded-[3.5rem] flex items-center justify-center animate-pulse shadow-inner border border-[#00D2D3]/10 relative z-10">
                <BrainCircuit className="w-16 h-16 text-[#00D2D3]/60" />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-black text-gradient leading-none">Hello {user?.name?.split(' ')[0]}!</h2>
              <p className="text-muted-foreground font-medium leading-relaxed italic opacity-80">
                "Speak or type to interact with the healthcare ecosystem core."
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
               {['Maternity Protocol', 'Growth Insights', 'Stress Analysis'].map(chip => (
                 <button key={chip} onClick={() => handleProtocolSend(chip)} className="px-6 py-3 rounded-full glass border-none text-[10px] font-black uppercase tracking-widest text-[#00D2D3] shadow-sm hover:scale-105 transition-all">{chip}</button>
               ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              layout
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] space-y-2 ${m.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`
                  p-6 rounded-[2.5rem] font-medium leading-relaxed shadow-premium border border-white/20
                  ${m.sender === 'user' 
                    ? 'bg-[#00D2D3] text-white rounded-tr-lg' 
                    : 'glass text-foreground rounded-tl-lg shadow-xl relative group overflow-hidden'}
                `}>
                  {m.text}
                  {m.sender === 'ai' && (
                    <button onClick={() => speak(m.text)} className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-40 transition-opacity hover:opacity-100 p-1">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <span className="text-[9px] font-black uppercase text-muted-foreground/30 px-4 tabular-nums">
                  {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Sync Protocol
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start px-4">
            <div className="glass p-6 rounded-[2rem] rounded-tl-lg flex gap-2 shadow-lg">
              <div className="w-2 h-2 bg-[#00D2D3] rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 bg-[#00D2D3] rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 bg-[#00D2D3] rounded-full animate-bounce" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Futuristic Voice/Text Interface */}
      <div className="shrink-0 pt-6 space-y-4 px-2">
        <AnimatePresence>
          {isListening && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center justify-center gap-5 glass p-6 rounded-[3rem] border-[#00D2D3]/20 shadow-2xl relative overflow-hidden"
            >
               <div className="absolute inset-0 bg-[#00D2D3]/5 animate-pulse" />
              <Ear className="w-6 h-6 text-[#00D2D3] animate-pulse relative z-10" />
              <div className="flex gap-1.5 h-6 items-center relative z-10">
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ height: [6, 24, 6] }}
                    transition={{ repeat: Infinity, duration: 0.4, delay: i * 0.05 }}
                    className="w-1 bg-[#00D2D3] rounded-full"
                  />
                ))}
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#00D2D3] relative z-10">Neural Handshake Active</span>
              <Button variant="ghost" size="icon" onClick={() => setIsListening(false)} className="h-8 w-8 hover:bg-rose-500/10 text-rose-500 relative z-10"><X className="w-4 h-4" /></Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative flex items-center gap-3">
          <div className="relative flex-1 group">
            <div className="absolute inset-0 bg-[#00D2D3]/5 rounded-[2.5rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleProtocolSend(input)}
              placeholder="Record protocol or type..."
              className="h-20 rounded-[2.5rem] glass border-none pl-10 pr-20 font-medium text-xl focus-visible:ring-[#00D2D3]/20 shadow-premium transition-all italic leading-none"
            />
            <button 
              onClick={startVoiceHandshake}
              className={`absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-[#00D2D3] text-white scale-110 shadow-lg' : 'bg-[#00D2D3]/10 text-[#00D2D3] hover:bg-[#00D2D3]/20'}`}
            >
              <Mic className="w-6 h-6" />
            </button>
          </div>
          <Button 
            onClick={() => handleProtocolSend(input)}
            disabled={isTyping || !input.trim()}
            className="h-20 w-20 rounded-[2.5rem] bg-[#00D2D3] text-white shadow-2xl shadow-[#00D2D3]/30 active:scale-95 transition-transform shrink-0 disabled:opacity-50 flex items-center justify-center border-4 border-white/20"
          >
            {isTyping ? <Loader2 className="w-8 h-8 animate-spin" /> : <Send className="w-8 h-8" />}
          </Button>
        </div>
      </div>
    </div>
  );
};