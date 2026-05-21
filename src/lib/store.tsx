import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, BioScan, Post, Message, AppState, Lesson, Reminder, JournalEntry } from './types';
import { toast } from 'sonner';

interface AppContextType extends AppState {
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  addScan: (scan: BioScan) => void;
  addPost: (post: Omit<Post, 'id' | 'likes' | 'replies' | 'time' | 'comments'>) => void;
  addComment: (postId: string, content: string) => void;
  toggleLike: (postId: string) => void;
  addMessage: (msg: Message) => void;
  clearMessages: () => void;
  updateWaterIntake: (amount: number) => void;
  toggleDarkMode: () => void;
  toggleReminder: (id: string) => void;
  deleteReminder: (id: string) => void;
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
  setAuthenticated: (val: boolean) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'mamacare_ecosystem_v11';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        messages: (parsed.messages || []).map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }))
      };
    }
    return {
      user: null,
      scans: [
        { id: 's1', bpm: 72, stressLevel: 12, oxygen: 98, timestamp: new Date().toISOString(), quality: 'Excellent' }
      ],
      posts: [
        {
          id: 'p1',
          author: 'Sarah Jenkins',
          avatar: 'https://i.pravatar.cc/150?u=sarah',
          content: "Just started the second trimester! The glow is real but so is the fatigue. 🤰✨",
          image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1000&auto=format&fit=crop',
          time: '2h ago',
          likes: 42,
          replies: 12,
          category: 'Conseils',
          isVerified: true,
          comments: []
        }
      ],
      messages: [],
      journal: [],
      lessons: [
        { id: '1', title: 'Neural Nutrition', progress: 80, category: 'Health' },
        { id: '2', title: 'First Trimester Protocol', progress: 100, category: 'Pregnancy' }
      ],
      reminders: [
        { id: '1', title: 'Neural Vitamins', time: '08:00', completed: false },
        { id: '2', title: 'Hydration Handshake', time: '12:00', completed: true }
      ],
      waterIntake: 1500,
      waterGoal: 2500,
      isDarkMode: false,
      isAuthenticated: false
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (state.isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [state]);

  const setUser = (user: User | null) => setState(prev => ({ ...prev, user, isAuthenticated: !!user }));
  
  const updateUser = (updates: Partial<User>) => setState(prev => ({
    ...prev,
    user: prev.user ? { ...prev.user, ...updates } : null
  }));

  const addScan = (scan: BioScan) => setState(prev => ({ ...prev, scans: [scan, ...prev.scans].slice(0, 50) }));
  
  const addPost = (post: any) => setState(prev => ({
    ...prev,
    posts: [{ ...post, id: Date.now().toString(), likes: 0, replies: 0, time: 'Just now', comments: [] }, ...prev.posts]
  }));

  const addComment = (postId: string, content: string) => setState(prev => ({
    ...prev,
    posts: prev.posts.map(p => p.id === postId ? {
      ...p,
      replies: p.replies + 1,
      comments: [{ id: Date.now().toString(), author: prev.user?.name || 'Mama', avatar: prev.user?.profileImage || '', content, time: 'Just now', likes: 0 }, ...p.comments]
    } : p)
  }));

  const toggleLike = (postId: string) => setState(prev => ({
    ...prev,
    posts: prev.posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p)
  }));

  const addMessage = (msg: Message) => setState(prev => ({ ...prev, messages: [...prev.messages, msg] }));
  const clearMessages = () => setState(prev => ({ ...prev, messages: [] }));
  const updateWaterIntake = (amount: number) => setState(prev => ({ ...prev, waterIntake: Math.max(0, prev.waterIntake + amount) }));
  const toggleDarkMode = () => setState(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }));
  
  const toggleReminder = (id: string) => setState(prev => ({
    ...prev,
    reminders: prev.reminders.map(r => r.id === id ? { ...r, completed: !r.completed } : r)
  }));

  const deleteReminder = (id: string) => setState(prev => ({
    ...prev,
    reminders: prev.reminders.filter(r => r.id !== id)
  }));

  const addJournalEntry = (entry: Omit<JournalEntry, 'id' | 'date'>) => {
    const newEntry: JournalEntry = { 
      ...entry, 
      id: Math.random().toString(36).substr(2, 9), 
      date: new Date().toISOString() 
    };
    setState(prev => ({ ...prev, journal: [newEntry, ...prev.journal] }));
  };

  const setAuthenticated = (val: boolean) => setState(prev => ({ ...prev, isAuthenticated: val }));
  
  const logout = () => {
    setState(prev => ({ ...prev, user: null, isAuthenticated: false }));
    toast.success('Identity decommissioned.');
  };

  return (
    <AppContext.Provider value={{ 
      ...state, 
      setUser, 
      updateUser, 
      addScan, 
      addPost, 
      addComment, 
      toggleLike, 
      addMessage, 
      clearMessages, 
      updateWaterIntake, 
      toggleDarkMode, 
      toggleReminder, 
      deleteReminder, 
      addJournalEntry,
      setAuthenticated, 
      logout 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};