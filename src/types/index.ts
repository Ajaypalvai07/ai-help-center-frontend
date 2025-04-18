export interface Message {
  id?: string;
  content: string;
  category: string;
  user_id: string;
  created_at?: string;
  status?: string;
  confidence?: number;
  role?: 'user' | 'assistant';
  timestamp?: string;
  type?: string;
}

export interface SimilarCase {
  id: string;
  title: string;
  similarity: number;
}

export interface Step {
  id: string;
  content: string;
  completed?: boolean;
  codeSnippet?: string;
  estimatedTime?: string;
}

export interface Solution {
  title?: string;
  answer: string;
  steps: Step[];
  references: string[];
  confidence: number;
  similar_cases: SimilarCase[];
}

export interface MessageResponse {
  id: string;
  content: string;
  confidence: number;
  created_at: string;
  message: {
    content: string;
    type?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  order: number;
  is_active: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at: string;
  last_login: string | null;
}

export interface AdminRole {
  id: string;
  name: string;
  permissions: string[];
}

export interface Metrics {
  overview: {
    totalUsers: number;
    activeUsers: number;
    totalIssues: number;
    resolvedIssues: number;
    escalatedIssues: number;
    averageResolutionTime: number;
    userSatisfaction: number;
  };
  categories: Array<{
    id: string;
    name: string;
    issueCount: number;
    resolutionRate: number;
  }>;
  timeline: Array<{
    date: string;
    issues: number;
    resolutions: number;
    satisfaction: number;
  }>;
  performance: {
    responseTime: number;
    accuracy: number;
    aiConfidence: number;
    escalationRate: number;
  };
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  language: string;
  showSettings: boolean;
  notifications: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
}

export interface AdminMetrics {
  total_users: number;
  active_users: number;
  total_messages: number;
  resolved_messages: number;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: string;
  message: string;
  details: any;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  is_active: boolean;
  created_at: string;
  last_login: string | null;
  preferences: Record<string, any>;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
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

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: string | null;
  solution?: Message;
}

export interface UploadResponse {
  id: string;
  filename: string;
  url: string;
  created_at: string;
}

export interface AnalysisResponse {
  id: string;
  content: string;
  confidence: number;
  created_at: string;
  metadata?: Record<string, any>;
}