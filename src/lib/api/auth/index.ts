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
  baseURL: `${config.apiUrl}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
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
    return authApi.post<AuthResponse>('/login', { email, password });
  },

  verify: async () => {
    return authApi.get<{ user: AuthResponse['user'] }>('/verify');
  },

  logout: async () => {
    return authApi.post('/logout');
  },
}; 