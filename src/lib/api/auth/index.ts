import axios, { AxiosResponse, AxiosInstance, AxiosError } from 'axios';
import { config } from '../../../config';

// Types
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

export interface AuthMethods {
  login(email: string, password: string): Promise<AxiosResponse<AuthResponse>>;
  register(email: string, password: string, name: string): Promise<AxiosResponse<AuthResponse>>;
  adminLogin(email: string, password: string): Promise<AxiosResponse<AuthResponse>>;
  verify(): Promise<AxiosResponse<{ user: AuthResponse['user'] }>>;
  logout(): Promise<void>;
}

// Define the auth service interface
export interface IAuthService {
  login(email: string, password: string): Promise<AxiosResponse<AuthResponse>>;
  register(email: string, password: string, name: string): Promise<AxiosResponse<AuthResponse>>;
  adminLogin(email: string, password: string): Promise<AxiosResponse<AuthResponse>>;
  verify(): Promise<AxiosResponse<{ user: AuthResponse['user'] }>>;
  logout(): Promise<void>;
}

// Implement the auth service
class AuthService implements AuthMethods {
  private readonly api: AxiosInstance;
  private readonly debug: boolean;

  constructor() {
    this.debug = import.meta.env.MODE === 'development';
    this.api = axios.create({
      baseURL: config.apiUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        if (this.debug) {
          console.log('🚀 API Request:', {
            method: config.method?.toUpperCase(),
            url: config.url,
            data: config.data,
            headers: config.headers,
          });
        }
        return config;
      },
      (error) => {
        if (this.debug) {
          console.error('❌ API Error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            config: {
              method: error.config?.method?.toUpperCase(),
              url: error.config?.url,
              data: error.config?.data,
            },
          });
        }
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => {
        if (response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/auth/login';
        }
        if (this.debug) {
          console.log('✅ API Response:', {
            status: response.status,
            data: response.data,
          });
        }
        return response;
      },
      (error: AxiosError) => {
        if (this.debug) {
          console.error('🚫 API Error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            config: {
              method: error.config?.method?.toUpperCase(),
              url: error.config?.url,
              data: error.config?.data,
            },
          });
        }
        if (error.response?.status === 500) {
          return Promise.reject({
            status: 500,
            message: 'Internal server error. Please try again later.',
            data: error.response.data
          });
        }
        return Promise.reject({
          status: error.response?.status || 500,
          message: error.message,
          data: error.response?.data
        });
      }
    );
  }

  async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    try {
      if (this.debug) console.log('📝 Login attempt:', { email });
      
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await this.api.post<AuthResponse>('/auth/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (this.debug) console.log('🔑 Login successful:', { user: response.data.user });
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }
      return response;
    } catch (error: any) {
      if (this.debug) {
        console.error('🚫 Login failed:', {
          error: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
      }
      throw error;
    }
  }

  async register(email: string, password: string, name: string): Promise<AxiosResponse<AuthResponse>> {
    try {
      if (this.debug) console.log('📝 Registration attempt:', { email, name });

      const response = await this.api.post<AuthResponse>('/auth/register', {
        email,
        password,
        name,
        is_active: true,
        role: 'user'
      });

      if (this.debug) console.log('✨ Registration successful:', { user: response.data.user });
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }
      return response;
    } catch (error: any) {
      if (this.debug) {
        console.error('🚫 Registration failed:', {
          error: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
      }
      throw error;
    }
  }

  async adminLogin(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    try {
      if (this.debug) console.log('👑 Admin login attempt:', { email });

      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await this.api.post<AuthResponse>('/auth/admin/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (this.debug) console.log('👑 Admin login successful:', { user: response.data.user });
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }
      if (response.data.user.role !== 'admin') {
        throw new Error('User is not an admin');
      }
      return response;
    } catch (error: any) {
      if (this.debug) {
        console.error('🚫 Admin login failed:', {
          error: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
      }
      throw error;
    }
  }

  async verify(): Promise<AxiosResponse<{ user: AuthResponse['user'] }>> {
    const token = localStorage.getItem('token');
    return this.api.get('/auth/verify', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async logout(): Promise<void> {
    if (this.debug) console.log('👋 Logging out');
    localStorage.removeItem('token');
  }
}

// Export the singleton instance
const authService = new AuthService();
export const auth = authService as AuthMethods; 