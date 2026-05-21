import React, { useState, useRef } from 'react';
import { useApp } from '../lib/store';
import { 
  Settings, 
  Shield, 
  Moon, 
  LogOut, 
  ChevronRight, 
  ChevronLeft,
  Camera, 
  Sparkles,
  Check,
  Save,
  Pencil,
  Lock,
  Database,
  Users as UsersIcon,
  ShieldCheck,
  Zap,
  Cpu,
  Fingerprint,
  Activity,
  BarChart3,
  Search
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export const Profile: React.FC = () => {
  const { user, isDarkMode, toggleDarkMode, updateUser, logout } = useApp();
  const [activeSubPage, setActiveSubPage] = useState<'main' | 'settings' | 'edit' | 'admin_login' | 'admin_dashboard'>('main');
  
  const [editName, setEditName] = useState(user?.name || '');
  const [editLocation, setEditLocation] = useState(user?.location || '');
  const [editBio, setEditBio] = useState(user?.bio || '');
  
  const [adminSecret, setAdminSecret] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Payload too large: Max 2MB threshold reached.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ profileImage: reader.result as string });
        toast.success("Identity visual updated in Cloud Matrix.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdminAuth = () => {
    const secret = import.meta.env.VITE_ADMIN_SECRET_KEY;
    if (adminSecret === secret) {
      updateUser({ isAdmin: true });
      toast.success('Owner confirmed. Unlocking Secure Core Matrix.');
      setActiveSubPage('admin_dashboard');
    } else {
      toast.error('Identity protocol mismatch. Access Denied.');
    }
  };

  return (
    <div className="space-y-10 pb-32 animate-in fade-in duration-700">
      {activeSubPage === 'main' && (
        <>
          <div className="relative pt-12 flex flex-col items-center space-y-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#00D2D3]/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000 opacity-50" />
              <Avatar 
                className="w-52 h-52 border-[10px] border-white dark:border-card shadow-2xl relative z-10 cursor-pointer overflow-hidden group-hover:scale-[1.02] transition-transform border border-white/20"
                onClick={() => fileInputRef.current?.click()}
              >
                <AvatarImage src={user?.profileImage || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1000"} />
                <AvatarFallback className="bg-[#00D2D3] text-white text-5xl font-black">{user?.name?.[0]}</AvatarFallback>
              </Avatar>
              <button 
                className="absolute bottom-4 right-4 w-16 h-16 bg-[#00D2D3] text-white rounded-full flex items-center justify-center border-8 border-white dark:border-card shadow-2xl z-20 hover:scale-110 transition-transform"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="w-8 h-8" />
              </button>
              <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handlePhotoUpload} />
            </div>
            
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-4">
                <h1 className="text-5xl font-black tracking-tighter text-gradient leading-none">{user?.name || 'Verified Mama'}</h1>
                {user?.isAdmin && (
                  <Badge className="bg-[#00D2D3] text-white border-none rounded-full h-8 px-4 flex items-center gap-2 shadow-lg shadow-[#00D2D3]/20">
                    <ShieldCheck className="w-4 h-4" /> OWNER
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground font-black text-[11px] uppercase tracking-[0.5em] opacity-40 leading-none">
                {user?.location || 'NEURAL HUB'} • verified identity
              </p>
            </div>

            <div className="flex gap-6 pt-4">
               <div className="glass px-10 py-5 rounded-[2.5rem] border-none shadow-sm text-center border border-white/20">
                  <p className="text-2xl font-black tabular-nums">{user?.wellnessScore || 98}%</p>
                  <p className="text-[9px] font-black uppercase opacity-40 tracking-widest leading-none">Wellness</p>
               </div>
               <div className="glass px-10 py-5 rounded-[2.5rem] border-none shadow-sm text-center border border-white/20">
                  <p className="text-2xl font-black tabular-nums">{user?.pregnancyWeek || 24}</p>
                  <p className="text-[9px] font-black uppercase opacity-40 tracking-widest leading-none">Protocol</p>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-8 px-2">
            <Card className="glass p-8 rounded-[3.5rem] border-none shadow-premium flex flex-col items-center justify-center space-y-4 cursor-pointer hover:bg-white/60 dark:hover:bg-card/60 transition-all group border border-white/10" onClick={() => setActiveSubPage('edit')}>
              <div className="w-16 h-16 bg-[#00D2D3]/10 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                <Pencil className="w-8 h-8 text-[#00D2D3]" />
              </div>
              <span className="font-black text-[10px] uppercase tracking-[0.2em] opacity-80">Persona</span>
            </Card>
            <Card className="glass p-8 rounded-[3.5rem] border-none shadow-premium flex flex-col items-center justify-center space-y-4 cursor-pointer hover:bg-white/60 dark:hover:bg-card/60 transition-all group border border-white/10" onClick={() => setActiveSubPage('settings')}>
              <div className="w-16 h-16 bg-[#00D2D3]/10 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                <Settings className="w-8 h-8 text-[#00D2D3]" />
              </div>
              <span className="font-black text-[10px] uppercase tracking-[0.2em] opacity-80">Systems</span>
            </Card>
          </div>

          <Button variant="ghost" className="w-full h-24 rounded-[3.5rem] glass justify-between px-12 border-none shadow-premium group border border-[#00D2D3]/5 hover:bg-rose-50 transition-colors" onClick={() => user?.isAdmin ? setActiveSubPage('admin_dashboard') : setActiveSubPage('admin_login')}>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all shadow-inner border border-rose-500/10">
                <Lock className="w-8 h-8" />
              </div>
              <div className="text-left">
                <span className="font-black text-base uppercase tracking-widest block">SECURE CORE</span>
                <span className="text-[11px] text-muted-foreground font-bold italic opacity-60 uppercase tracking-tighter text-gradient leading-none">Protocol Vault</span>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-muted-foreground/30 group-hover:translate-x-2 transition-transform" />
          </Button>

          <div className="text-center space-y-4 py-16 border-t border-[#00D2D3]/5 opacity-20">
             <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#00D2D3] leading-loose">MamaCare Technologies Global Ecosystem<br/>Secured by Leonel Aaron</p>
             <div className="flex justify-center gap-8">
                <Cpu className="w-5 h-5" />
                <Zap className="w-5 h-5" />
                <Activity className="w-5 h-5" />
             </div>
          </div>
        </>
      )}

      {/* Admin Auth Handshake */}
      {activeSubPage === 'admin_login' && (
        <div className="space-y-10 animate-in slide-in-from-bottom duration-500 min-h-[60vh] flex flex-col justify-center">
          <header className="flex items-center gap-6 px-4">
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl glass border border-white/20" onClick={() => setActiveSubPage('main')}>
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-4xl font-black tracking-tighter text-gradient uppercase italic leading-none">Authentication</h1>
          </header>
          <Card className="glass p-12 rounded-[4.5rem] border-none shadow-2xl space-y-10 relative overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-t from-[#00D2D3]/5 to-transparent opacity-50" />
            <div className="text-center space-y-8 relative">
              <div className="w-28 h-28 bg-[#00D2D3] rounded-[3rem] flex items-center justify-center mx-auto shadow-2xl shadow-[#00D2D3]/40 border-4 border-white/20">
                <Fingerprint className="w-14 h-14 text-white animate-pulse" />
              </div>
              <div className="space-y-3 px-4 leading-snug">
                <p className="text-2xl font-black uppercase tracking-tight text-gradient leading-none">PROTOCOL AARON</p>
                <p className="text-muted-foreground font-bold text-base italic leading-relaxed">"Verify ownership signature to decrypt ecosystem core control matrix."</p>
              </div>
            </div>
            <div className="space-y-6 relative">
              <Input 
                type="password"
                placeholder="DECRYPT SEQUENCE..." 
                className="h-20 rounded-[2.5rem] glass border-none px-8 font-black text-2xl tracking-[0.5em] text-center shadow-inner focus-visible:ring-[#00D2D3]/20"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
              />
              <Button onClick={handleAdminAuth} className="w-full h-20 rounded-[2.5rem] bg-[#00D2D3] text-white font-black text-2xl gap-4 shadow-2xl shadow-[#00D2D3]/30 active:scale-95 transition-transform overflow-hidden group">
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Zap className="w-7 h-7 fill-white" /> Authenticate
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Owner Admin Dashboard Matrix */}
      {activeSubPage === 'admin_dashboard' && (
        <div className="space-y-10 animate-in fade-in duration-1000">
           <header className="flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl glass border border-white/20" onClick={() => setActiveSubPage('main')}>
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <h1 className="text-3xl font-black uppercase italic tracking-tighter text-gradient leading-none">Owner Hub</h1>
            </div>
            <Badge className="bg-[#00D2D3] text-white border-none shadow-lg h-8 px-6 text-[10px] font-black tracking-widest">LIVE MATRIX</Badge>
          </header>

          <div className="grid grid-cols-2 gap-8 px-2">
            <Card className="glass p-10 rounded-[3.5rem] border-none shadow-premium space-y-4 border border-white/10 group cursor-pointer hover:bg-white transition-colors">
               <UsersIcon className="w-10 h-10 text-[#00D2D3] group-hover:scale-110 transition-transform" />
               <div className="space-y-1">
                 <p className="text-4xl font-black tracking-tighter">1,402</p>
                 <p className="text-[11px] font-black uppercase opacity-40 tracking-widest leading-none">Global Nodes</p>
               </div>
            </Card>
            <Card className="glass p-10 rounded-[3.5rem] border-none shadow-premium space-y-4 border border-white/10 group cursor-pointer hover:bg-white transition-colors">
               <Database className="w-10 h-10 text-[#00D2D3] group-hover:scale-110 transition-transform" />
               <div className="space-y-1">
                 <p className="text-4xl font-black tabular-nums tracking-tighter">1.2 TB</p>
                 <p className="text-[11px] font-black uppercase opacity-40 tracking-widest leading-none">Neural Data</p>
               </div>
            </Card>
          </div>

          <div className="space-y-4 pt-6 px-2">
            <h3 className="text-[12px] font-black uppercase tracking-[0.4em] opacity-30 ml-6 mb-2">System Root Nodes</h3>
            {['Matrix Analytics v10', 'Identity Neural Vault', 'AI Kernel Unit 5.0', 'Firewall Matrix 2.0'].map(item => (
              <Card key={item} className="glass p-8 rounded-[2.5rem] border-none flex items-center justify-between group cursor-pointer hover:bg-white transition-all shadow-sm border border-white/10 group">
                 <div className="flex items-center gap-6">
                   <div className="w-14 h-14 bg-[#00D2D3]/10 rounded-2xl flex items-center justify-center text-[#00D2D3] group-hover:bg-[#00D2D3] group-hover:text-white transition-all shadow-inner border border-[#00D2D3]/10"><Cpu className="w-7 h-7" /></div>
                   <span className="font-black text-base uppercase tracking-tight">{item}</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <Badge variant="outline" className="h-6 border-[#00D2D3]/20 text-[#00D2D3] text-[8px] font-black uppercase tracking-widest opacity-60">Stable</Badge>
                    <ChevronRight className="w-5 h-5 text-muted-foreground/20 group-hover:text-[#00D2D3] group-hover:translate-x-1 transition-all" />
                 </div>
              </Card>
            ))}
          </div>

          <Button variant="ghost" className="w-full h-22 rounded-[3.5rem] glass text-rose-500 font-black text-xl gap-4 border border-rose-500/10 mt-10 active:scale-95 transition-transform" onClick={() => { updateUser({ isAdmin: false }); setActiveSubPage('main'); }}>
             <LogOut className="w-7 h-7" /> Terminate Owner Session
          </Button>
        </div>
      )}

      {/* Editable Persona Node */}
      {activeSubPage === 'edit' && (
        <div className="space-y-10 animate-in slide-in-from-bottom duration-500">
           <header className="flex items-center gap-6 px-4">
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl glass border border-white/10" onClick={() => setActiveSubPage('main')}>
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-4xl font-black tracking-tighter leading-none text-gradient uppercase italic">Protocol Edit</h1>
          </header>
          <Card className="glass p-12 rounded-[4.5rem] border-none shadow-premium space-y-12 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D2D3]/5 rounded-full blur-[80px] -mr-32 -mt-32" />
            <div className="space-y-10 px-2 relative z-10">
              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-[0.4em] ml-8 opacity-40 text-primary">Legal Identity Name</label>
                <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="h-20 rounded-[2.5rem] glass border-none px-10 font-black text-2xl shadow-inner focus-visible:ring-[#00D2D3]/20" />
              </div>
              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-[0.4em] ml-8 opacity-40 text-primary">Node Geographic Location</label>
                <Input value={editLocation} onChange={(e) => setEditLocation(e.target.value)} className="h-20 rounded-[2.5rem] glass border-none px-10 font-black text-2xl shadow-inner focus-visible:ring-[#00D2D3]/20" />
              </div>
              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-[0.4em] ml-8 opacity-40 text-primary">Neural Protocol Persona (Bio)</label>
                <Input value={editBio} onChange={(e) => setEditBio(e.target.value)} className="h-20 rounded-[2.5rem] glass border-none px-10 font-black text-2xl shadow-inner focus-visible:ring-[#00D2D3]/20" />
              </div>
            </div>
            <Button onClick={() => { updateUser({ name: editName, location: editLocation, bio: editBio }); setActiveSubPage('main'); toast.success('Identity protocols synchronized successfully.'); }} className="w-full h-20 rounded-[2.5rem] bg-[#00D2D3] text-white font-black text-2xl gap-5 shadow-2xl shadow-[#00D2D3]/40 active:scale-95 transition-transform overflow-hidden group">
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Save className="w-8 h-8" /> Synchronize Matrix
            </Button>
          </Card>
        </div>
      )}

      {/* System Configurations Node */}
      {activeSubPage === 'settings' && (
        <div className="space-y-10 animate-in slide-in-from-bottom duration-500">
           <header className="flex items-center gap-6 px-4">
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl glass border border-white/10" onClick={() => setActiveSubPage('main')}>
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-4xl font-black tracking-tighter leading-none text-gradient uppercase italic">Systems</h1>
          </header>
          <div className="space-y-8 px-2">
            <Card className="glass p-10 rounded-[4rem] border-none flex items-center justify-between shadow-premium border border-white/5">
              <div className="flex items-center gap-8 group">
                <div className="w-18 h-18 bg-indigo-500/10 rounded-[2rem] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform"><Moon className="w-10 h-10 text-indigo-500" /></div>
                <div className="space-y-1">
                   <p className="font-black text-2xl uppercase tracking-tighter leading-none">Dark Protocol</p>
                   <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest opacity-40 italic">Neural Visual Efficiency</p>
                </div>
              </div>
              <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} className="h-8 w-14 data-[state=checked]:bg-[#00D2D3]" />
            </Card>

            <Card className="glass p-10 rounded-[4rem] border-none flex items-center justify-between shadow-premium border border-white/5">
              <div className="flex items-center gap-8 group">
                <div className="w-18 h-18 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform"><Fingerprint className="w-10 h-10 text-emerald-500" /></div>
                <div className="space-y-1">
                   <p className="font-black text-2xl uppercase tracking-tighter leading-none">Biometrics</p>
                   <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest opacity-40 italic">FaceID / TouchID Active</p>
                </div>
              </div>
              <Switch checked={true} onCheckedChange={() => {}} className="h-8 w-14 data-[state=checked]:bg-[#00D2D3]" />
            </Card>
            
            <section className="pt-12 space-y-8 px-4">
               <h3 className="text-[12px] font-black uppercase tracking-[0.4em] opacity-30 italic">Ecosystem Legal Matrix</h3>
               <div className="space-y-4">
                 {['Data Sovereignty Protocol', 'Neural Encryption Policy', 'Maternal Ethics Matrix'].map(item => (
                   <div key={item} className="flex items-center justify-between p-2 border-b border-black/5 group cursor-pointer hover:bg-white/40 rounded-xl transition-all">
                     <span className="font-black text-sm uppercase tracking-tight opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all">{item}</span>
                     <ChevronRight className="w-5 h-5 opacity-20 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
                   </div>
                 ))}
               </div>
            </section>

            <Button onClick={logout} variant="ghost" className="w-full h-24 rounded-[3.5rem] glass text-rose-500 font-black text-2xl gap-5 mt-16 border border-rose-500/10 active:scale-95 transition-all shadow-xl shadow-rose-500/5 group relative overflow-hidden">
               <div className="absolute inset-0 bg-rose-500/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
               <LogOut className="w-8 h-8 relative z-10" /> <span className="relative z-10">Decommission Identity</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};