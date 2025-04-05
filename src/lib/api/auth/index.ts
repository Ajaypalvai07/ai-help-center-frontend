import axios from 'axios';
import { config } from '../../../config';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    is_active: boolean;
    created_at: string;
    last_login: string | null;
    preferences: Record<string, any>;
  };
}

// Create axios instance with base URL and CORS credentials
const authApi = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
});

// Add auth token to requests if available
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
      // Create form data as expected by OAuth2PasswordRequestForm
      const formData = new URLSearchParams();
      formData.append('username', email); // OAuth2 expects 'username' field
      formData.append('password', password);

      const response = await authApi.post<AuthResponse>('/auth/token', formData);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (email: string, password: string, name: string) => {
    try {
      const response = await authApi.post<AuthResponse>('/auth/register', {
        email,
        password,
        name,
        role: 'user'
      });
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  verify: async () => {
    return authApi.get<{ user: AuthResponse['user'] }>('/auth/verify');
  },

  logout: async () => {
    localStorage.removeItem('token');
    return authApi.post('/auth/logout');
  },
}; 