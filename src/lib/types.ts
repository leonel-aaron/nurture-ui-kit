export interface User {
  id?: string;
  name: string;
  email: string;
  location?: string;
  bio?: string;
  profileImage?: string;
  dueDate?: string;
  startDate: string;
  isOnboarded: boolean;
  wellnessScore: number;
  pregnancyWeek: number;
  isAdmin?: boolean;
  biometricEnabled?: boolean;
  language?: 'fr' | 'en';
}

export interface BioScan {
  id: string;
  bpm: number;
  stressLevel: number;
  oxygen: number;
  timestamp: string;
  quality: 'Excellent' | 'Good' | 'Poor';
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  time: string;
  likes: number;
  replies: number;
  category: 'Tout' | 'Santé' | 'Conseils' | 'Shopping' | 'Yoga';
  isVerified?: boolean;
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emotion?: string;
  isVoice?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  progress: number;
  category: string;
}

export interface Reminder {
  id: string;
  title: string;
  time: string;
  completed: boolean;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: 'happy' | 'neutral' | 'tired' | 'sad' | 'excited';
}

export interface AppState {
  user: User | null;
  scans: BioScan[];
  posts: Post[];
  messages: Message[];
  lessons: Lesson[];
  reminders: Reminder[];
  journal: JournalEntry[];
  waterIntake: number;
  waterGoal: number;
  isDarkMode: boolean;
  isAuthenticated: boolean;
}