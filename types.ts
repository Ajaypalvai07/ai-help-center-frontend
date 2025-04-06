export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  isActive?: boolean;
  createdAt?: string;
  lastLogin?: string;
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
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: string | null;
  solution?: Message;
}

export interface AdminMetrics {
  totalUsers: number;
  totalMessages: number;
  resolvedIssues: number;
  resolutionRate: string;
  activeUsers: number;
  averageResponseTime: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  lastActivity: string | null;
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
} 