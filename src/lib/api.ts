import axios from 'axios';
import type { AdminMetrics, AdminUser, AdminRole, SystemLog,  User, MessageResponse, UploadResponse, AnalysisResponse } from '../types';

// API Response Types
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Auth Types
interface LoginResponse {
  user: User;
  access_token: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

// API Interface Definitions
interface AdminAPI {
  getMetrics: () => Promise<ApiResponse<AdminMetrics>>;
  getUsers: () => Promise<ApiResponse<AdminUser[]>>;
  getRoles: () => Promise<ApiResponse<AdminRole[]>>;
  getLogs: () => Promise<ApiResponse<SystemLog[]>>;
}

interface ChatAPI {
  analyze: (data: { content: string; category?: string }) => Promise<ApiResponse<MessageResponse>>;
  analyzeMessage: (data: { content: string; category?: string }) => Promise<ApiResponse<MessageResponse>>;
  submitFeedback: (messageId: string, data: { rating: number; comment?: string }) => Promise<ApiResponse<{ success: boolean }>>;
}

interface CategoriesAPI {
  getAll: () => Promise<ApiResponse<{ id: string; name: string; description: string }[]>>;
  getById: (id: string) => Promise<ApiResponse<{ id: string; name: string; description: string }>>;
}

interface AuthAPI {
  login: (email: string, password: string) => Promise<ApiResponse<LoginResponse>>;
  register: (data: RegisterData) => Promise<ApiResponse<LoginResponse>>;
  signup: (data: RegisterData) => Promise<ApiResponse<LoginResponse>>;
  verify: () => Promise<ApiResponse<{ user: User }>>;
}

interface MultimediaAPI {
  uploadImage: (formData: FormData) => Promise<ApiResponse<{ url: string }>>;
  uploadAudio: (file: File) => Promise<ApiResponse<UploadResponse>>;
  uploadVoice: (formData: FormData) => Promise<ApiResponse<{ url: string }>>;
  getAnalysis: (analysisId: string) => Promise<ApiResponse<AnalysisResponse>>;
}

interface FeedbackAPI {
  submit: (data: { message_id: string; rating: number; feedback_type: string; comment?: string }) => Promise<ApiResponse<{ success: boolean }>>;
}

// Create API instance with custom interfaces
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// API method implementations
const adminApi: AdminAPI = {
  getMetrics: () => api.get('/api/v1/admin/metrics'),
  getUsers: () => api.get('/api/v1/admin/users'),
  getRoles: () => api.get('/api/v1/admin/roles'),
  getLogs: () => api.get('/api/v1/admin/logs'),
};

const chatApi: ChatAPI = {
  analyze: (data) => api.post('/api/v1/chat/analyze', data),
  analyzeMessage: (data) => api.post('/api/v1/chat/analyzeMessage', data),
  submitFeedback: (messageId, data) => api.post(`/api/v1/chat/${messageId}/feedback`, data),
};

const categoriesApi: CategoriesAPI = {
  getAll: () => api.get('/api/v1/categories'),
  getById: (id) => api.get(`/api/v1/categories/${id}`),
};

const authApi: AuthAPI = {
  login: (email, password) => api.post('/api/v1/auth/login', { email, password }),
  register: (data) => api.post('/api/v1/auth/register', data),
  signup: (data) => api.post('/api/v1/auth/register', data),
  verify: () => api.get('/api/v1/auth/verify'),
};

const multimediaApi: MultimediaAPI = {
  uploadImage: (formData) => api.post('/multimedia/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  uploadAudio: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/v1/multimedia/upload/audio', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadVoice: (formData) => api.post('/multimedia/voice', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getAnalysis: (analysisId) => api.get(`/api/v1/multimedia/analysis/${analysisId}`),
};

const feedbackApi: FeedbackAPI = {
  submit: (data) => api.post('/feedback/submit', data)
};

// Attach API interfaces to the axios instance
const extendedApi = api as typeof api & {
  admin: AdminAPI;
  chat: ChatAPI;
  categories: CategoriesAPI;
  auth: AuthAPI;
  multimedia: MultimediaAPI;
  feedback: FeedbackAPI;
};

extendedApi.admin = adminApi;
extendedApi.chat = chatApi;
extendedApi.categories = categoriesApi;
extendedApi.auth = authApi;
extendedApi.multimedia = multimediaApi;
extendedApi.feedback = feedbackApi;

const apiObject = {
  auth: extendedApi.auth,
  chat: extendedApi.chat,
  admin: extendedApi.admin,
  categories: extendedApi.categories,
  multimedia: extendedApi.multimedia,
  feedback: extendedApi.feedback
};

export const auth = extendedApi.auth;
export const chat = extendedApi.chat;
export const admin = extendedApi.admin;
export const categories = extendedApi.categories;
export const multimedia = extendedApi.multimedia;
export const feedback = extendedApi.feedback;

export default apiObject;
export type { ApiResponse, LoginResponse, RegisterData, AdminAPI, ChatAPI, CategoriesAPI, AuthAPI, MultimediaAPI, FeedbackAPI };