import axios from 'axios';
import { config } from '../../../config';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

const authApi = axios.create({
  baseURL: `${config.apiUrl}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

// Add token to requests if it exists
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    try {
      const response = await authApi.post<AuthResponse>('/auth/login', { email, password });
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  verify: async () => {
    return authApi.get<{ user: AuthResponse['user'] }>('/auth/verify');
  },

  logout: async () => {
    return authApi.post('/auth/logout');
  },
}; 