import axios, { AxiosResponse, AxiosInstance } from 'axios';
import { config } from '../../../config';

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
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
  logout(): Promise<AxiosResponse<void>>;
}

// Define the auth service interface
export interface IAuthService {
  login(email: string, password: string): Promise<AxiosResponse<AuthResponse>>;
  register(email: string, password: string, name: string): Promise<AxiosResponse<AuthResponse>>;
  adminLogin(email: string, password: string): Promise<AxiosResponse<AuthResponse>>;
  verify(): Promise<AxiosResponse<{ user: AuthResponse['user'] }>>;
  logout(): Promise<AxiosResponse<void>>;
}

// Implement the auth service
class AuthService implements AuthMethods {
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `${config.apiUrl}/api/v1`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests if it exists
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    
    return this.api.post<AuthResponse>('/auth/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  async register(email: string, password: string, name: string): Promise<AxiosResponse<AuthResponse>> {
    try {
      // Ensure password meets minimum length requirement
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // Match the UserCreate model from the backend
      const userData = {
        email,
        password,
        name,
        is_active: true,
        role: "user"
      };

      const response = await this.api.post<AuthResponse>('/auth/register', userData);
      
      // Store token if available
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response;
    } catch (error: any) {
      // Handle specific error cases
      if (error.response?.status === 400) {
        throw new Error(error.response.data.detail || 'Invalid registration data');
      }
      if (error.response?.status === 500) {
        throw new Error('Server error during registration. Please try again.');
      }
      throw error;
    }
  }

  async adminLogin(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);
      
      const response = await this.api.post<AuthResponse>('/auth/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.data?.user?.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
      }

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      return response;
    } catch (error: any) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw error;
    }
  }

  async verify(): Promise<AxiosResponse<{ user: AuthResponse['user'] }>> {
    return this.api.get<{ user: AuthResponse['user'] }>('/auth/verify');
  }

  async logout(): Promise<AxiosResponse<void>> {
    localStorage.removeItem('token');
    return this.api.post<void>('/auth/logout');
  }
}

// Export the singleton instance
const authService = new AuthService();
export const auth = authService as unknown as AuthMethods; 