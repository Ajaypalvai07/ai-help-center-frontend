// import { ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  isActive?: boolean;
  createdAt?: string;
  lastLogin?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  parentId?: string;
  metadata?: Record<string, unknown>;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: string;
  type?: string;
  category?: string;
  userId?: string;
  severity?: 'low' | 'medium' | 'high';
  confidence?: number;
}

export interface Store {
  auth: AuthState;
  chat: ChatState;
  metrics: AdminMetrics | null;

  // Auth actions
  setUser: (user: User | null) => void;
  clearUser: () => void;
  updateLastActivity: () => void;

  // Chat actions
  setChatState: (chatState: Partial<ChatState>) => void;
  clearChatState: () => void;
  addMessage: (message: Message) => void;
  setSolution: (solution: Message) => void;

  // Admin metrics actions
  updateMetrics: (metrics: Partial<AdminMetrics>) => void;

  login: (email: string, password: string) => Promise<{ user: User; token: string }>;
  signOut: () => void;
  initializeAuth: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setChat: (chatState: ChatState) => void;
}

export interface AdminMetrics {
  totalUsers: number;
  totalMessages: number;
  resolvedIssues: number;
  resolutionRate: string;
  activeUsers: number;
  averageResponseTime: string;
}

export interface AdminUser extends Omit<User, 'preferences'> {
  permissions: string[];
}

export interface AdminRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SystemLog {
  id: string;
  level: 'error' | 'warn' | 'info';
  message: string;
  timestamp: string;
  details?: Record<string, unknown>;
  userId?: string;
}

export interface Solution {
  id: string;
  title: string;
  steps: Step[];
  category: string;
  confidence: number;
  answer?: string;
  references?: string[];
}

export interface Step {
  id: string;
  content: string;
  type: 'text' | 'code' | 'image';
  completed?: boolean;
  codeSnippet?: string;
  estimatedTime?: string;
  metadata?: Record<string, any>;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
  fontSize?: string;
  showSettings?: boolean;
}

export interface MessageFeedback {
  rating: number;
  comment?: string;
  timestamp: string;
}

export interface MessageResponse {
  message: {
    content: string;
    type?: 'text' | 'code' | 'image' | 'audio';
  };
  text?: string;
  category?: string;
  confidence?: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: string | null;
  solution?: Message;
}

export interface UploadResponse {
  url: string;
  fileId: string;
  fileType: string;
  fileName: string;
}

export interface AnalysisResponse {
  id: string;
  status: 'pending' | 'completed' | 'failed';
  result?: {
    text?: string;
    confidence: number;
    metadata: Record<string, unknown>;
  };
  error?: string;
}

export interface ChatSettings {
  autoScroll: boolean;
  notifications: boolean;
  soundEnabled: boolean;
}

export interface ApiErrorResponse {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export interface ApiSuccessResponse<T> {
  status: number;
  data: T;
  message?: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  lastActivity: string | null;
} 