import React, { useState } from 'react';
import { useApp } from '../lib/store';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Search, 
  Plus, 
  TrendingUp,
  Clock,
  Sparkles,
  Camera,
  X,
  ArrowUpRight,
  MessageSquareShare,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

export const Community: React.FC = () => {
  const { posts, user, toggleLike, addPost, addComment } = useApp();
  const [activeCategory, setActiveCategory] = useState<'Tout' | 'Santé' | 'Conseils' | 'Shopping' | 'Yoga'>('Tout');
  const [isPosting, setIsPosting] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState<string | null>(null);
  const [commentText, setCommentInput] = useState<{ [key: string]: string }>({});

  const categories = ['Tout', 'Santé', 'Conseils', 'Shopping', 'Yoga'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPostImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = () => {
    if (!postContent.trim()) return;
    addPost({
      author: user?.name || 'Verified Mama',
      avatar: user?.profileImage || 'https://i.pravatar.cc/150?u=mama',
      content: postContent,
      image: postImage || undefined,
      category: activeCategory === 'Tout' ? 'Conseils' : activeCategory,
      isVerified: true
    });
    setPostContent('');
    setPostImage(null);
    setIsPosting(false);
    toast.success("Broadcast successful! Identity verified.");
  };

  const filteredPosts = activeCategory === 'Tout' ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-10 pb-32 animate-in fade-in duration-700">
      <header className="space-y-6 px-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-gradient leading-none">The Hive<span className="text-[#00D2D3]">.</span></h1>
            <p className="text-muted-foreground font-bold text-sm">Secure Maternal Networking.</p>
          </div>
          <Button 
            size="icon" 
            className="w-16 h-16 rounded-2xl bg-[#00D2D3] text-white shadow-premium hover:scale-105 transition-transform"
            onClick={() => setIsPosting(true)}
          >
            <Plus className="w-8 h-8" />
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/30" />
          <Input 
            placeholder="Search the neural matrix..." 
            className="h-16 pl-16 pr-6 rounded-3xl glass border-none shadow-premium font-medium text-lg italic"
          />
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
          {categories.map((cat: any) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`
                whitespace-nowrap px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all
                ${activeCategory === cat 
                  ? 'bg-[#00D2D3] text-white shadow-xl shadow-[#00D2D3]/30' 
                  : 'glass text-muted-foreground hover:text-[#00D2D3]'}
              `}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </header>

      {/* Trending discussion */}
      <div className="flex items-center gap-6 px-8 py-6 glass rounded-[3.5rem] border-none shadow-sm relative overflow-hidden group border border-[#00D2D3]/5 cursor-pointer">
        <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
          <TrendingUp className="w-8 h-8 text-rose-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-1">SYSTEM TREND</p>
          <h3 className="font-black truncate tracking-tight text-xl">#EcoMaternityProtocols2025</h3>
        </div>
        <ArrowUpRight className="w-7 h-7 text-muted-foreground/20 group-hover:text-[#00D2D3] transition-colors" />
      </div>

      <div className="space-y-12">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 150 }}
            >
              <Card className="glass p-10 rounded-[4.5rem] border-none shadow-premium space-y-8 hover:shadow-2xl transition-all duration-500 group relative border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                       <Avatar className="w-18 h-18 border-4 border-white dark:border-card shadow-lg">
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback className="bg-[#00D2D3]/10 text-[#00D2D3] font-black">{post.author[0]}</AvatarFallback>
                      </Avatar>
                      {post.isVerified && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#00D2D3] rounded-full border-4 border-white dark:border-card flex items-center justify-center">
                           <ShieldCheck className="w-3 h-3 text-white fill-white" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-black text-2xl tracking-tighter leading-none">{post.author}</h4>
                      <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                        <Clock className="w-3.5 h-3.5" /> {post.time} • Secure Node
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-[#00D2D3]/5 text-[#00D2D3] border-none rounded-full px-5 py-2 font-black uppercase text-[10px] tracking-widest shadow-inner leading-none">
                    {post.category}
                  </Badge>
                </div>

                <p className="text-2xl font-medium leading-relaxed text-foreground/80 px-2 italic">
                  "{post.content}"
                </p>

                {post.image && (
                  <div className="rounded-[3.5rem] overflow-hidden shadow-inner border-4 border-white/40 dark:border-white/5 relative aspect-video">
                    <img src={post.image} alt="Story" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 px-2 relative z-10">
                  <div className="flex items-center gap-8">
                    <button 
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center gap-3 font-black text-[12px] uppercase tracking-[0.2em] group/btn hover:scale-105 transition-transform"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-rose-500/5 flex items-center justify-center group-active/btn:scale-125 group-hover/btn:bg-rose-500 group-hover/btn:text-white transition-all shadow-sm border border-rose-500/10">
                        <Heart className="w-7 h-7" />
                      </div>
                      <span className="opacity-60 tabular-nums">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-3 font-black text-[12px] uppercase tracking-[0.2em] group/btn hover:scale-105 transition-transform">
                      <div className="w-14 h-14 rounded-2xl bg-[#00D2D3]/5 flex items-center justify-center group-hover/btn:bg-[#00D2D3] group-hover/btn:text-white transition-all shadow-sm border border-[#00D2D3]/10">
                        <MessageSquareShare className="w-7 h-7" />
                      </div>
                      <span className="opacity-60 tabular-nums">{post.replies}</span>
                    </button>
                  </div>
                  <button className="w-14 h-14 rounded-2xl bg-muted/30 flex items-center justify-center hover:bg-muted transition-all active:scale-90 shadow-inner">
                    <Share2 className="w-7 h-7 text-muted-foreground" />
                  </button>
                </div>

                {/* Real Discussion Threads */}
                <div className="space-y-4 pt-6 border-t border-[#00D2D3]/10">
                   {post.comments.map(c => (
                     <div key={c.id} className="flex gap-4 p-5 glass rounded-[2rem] border-none shadow-sm animate-in slide-in-from-left duration-500">
                        <Avatar className="w-10 h-10 border-2 border-white"><AvatarImage src={c.avatar} /></Avatar>
                        <div className="flex-1 space-y-1">
                           <div className="flex justify-between items-center">
                              <p className="font-black text-xs uppercase opacity-80">{c.author}</p>
                              <span className="text-[8px] font-bold opacity-30 uppercase">{c.time}</span>
                           </div>
                           <p className="text-sm font-medium opacity-70 leading-snug">"{c.content}"</p>
                        </div>
                     </div>
                   ))}
                   <div className="relative pt-2">
                      <Input 
                        placeholder="Sync your thoughts..." 
                        className="h-16 rounded-[2rem] glass border-none pl-6 pr-16 font-medium italic text-lg"
                        value={commentText[post.id] || ''}
                        onChange={(e) => setCommentInput(prev => ({ ...prev, [post.id]: e.target.value }))}
                        onKeyPress={(e) => e.key === 'Enter' && (addComment(post.id, commentText[post.id]), setCommentInput(prev => ({ ...prev, [post.id]: '' })))}
                      />
                      <button 
                        onClick={() => { addComment(post.id, commentText[post.id]); setCommentInput(prev => ({ ...prev, [post.id]: '' })); }}
                        className="absolute right-2 top-[calc(50%+4px)] -translate-y-1/2 w-12 h-12 bg-[#00D2D3] text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                      >
                        <Zap className="w-5 h-5 fill-white" />
                      </button>
                   </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isPosting && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-2xl flex items-center justify-center p-6">
            <Card className="w-full max-w-sm glass p-10 rounded-[4.5rem] border-none shadow-2xl space-y-10 border border-white/10">
              <div className="flex justify-between items-center px-2">
                <h2 className="text-3xl font-black tracking-tighter italic">Broadcast</h2>
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 hover:bg-rose-500/10 text-rose-500" onClick={() => setIsPosting(false)}><X className="w-6 h-6" /></Button>
              </div>
              <Textarea 
                placeholder="What protocol should we share, Mama?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="min-h-[180px] rounded-[2.5rem] glass border-none p-8 font-medium text-xl focus-visible:ring-[#00D2D3]/20 shadow-inner italic leading-relaxed"
              />
              {postImage && (
                <div className="relative h-56 rounded-[3rem] overflow-hidden border border-white/20 shadow-2xl">
                  <img src={postImage} className="w-full h-full object-cover" />
                  <button onClick={() => setPostImage(null)} className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-rose-500 transition-colors shadow-lg"><X className="w-4 h-4" /></button>
                </div>
              )}
              <div className="flex gap-4">
                <Button variant="ghost" className="flex-1 h-16 rounded-[2rem] glass border-none gap-3 font-black text-xs uppercase tracking-widest" onClick={() => document.getElementById('com-img')?.click()}>
                  <Camera className="w-5 h-5 text-[#00D2D3]" /> Visual
                </Button>
                <input type="file" id="com-img" hidden accept="image/*" onChange={handleImageUpload} />
                <Button className="flex-[2] h-16 rounded-[2rem] bg-[#00D2D3] text-white font-black text-lg shadow-xl shadow-[#00D2D3]/30 active:scale-95 transition-all group overflow-hidden relative">
                   <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                   Publish Node
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center opacity-30 text-[9px] font-black uppercase tracking-[0.8em] py-16 border-t border-[#00D2D3]/5 leading-loose">
        Neural Hive Protocol v10.0<br/>
        DEUGA NGANDEU LEONEL ARRON Innovation
      </div>
    </div>
  );
};