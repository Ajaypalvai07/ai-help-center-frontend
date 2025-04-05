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
      baseURL: config.apiUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      validateStatus: (status) => status < 500
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Making request to:', config.url, config);
        return config;
      },
      (error) => {
        console.error('Request error:', error);
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
        return response;
      },
      (error: AxiosError) => {
        console.error('Auth API Error:', error);
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
      console.log('Attempting login with:', { email });
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await this.api.post<AuthResponse>('/auth/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }

      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(email: string, password: string, name: string): Promise<AxiosResponse<AuthResponse>> {
    try {
      console.log('Sending registration request:', {
        url: `${config.apiUrl}/auth/register`,
        data: { email, password: '***', name, is_active: true, role: 'user' }
      });

      const response = await this.api.post<AuthResponse>('/auth/register', {
        email,
        password,
        name,
        is_active: true,
        role: 'user'
      });

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }

      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async adminLogin(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    try {
      console.log('Attempting admin login with:', { email });
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await this.api.post<AuthResponse>('/auth/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }

      if (response.data.user.role !== 'admin') {
        throw new Error('User is not an admin');
      }

      return response;
    } catch (error) {
      console.error('Admin login error:', error);
      throw error;
    }
  }

  async verify(): Promise<AxiosResponse<{ user: AuthResponse['user'] }>> {
    return this.api.get('/auth/verify');
  }

  async logout(): Promise<void> {
    localStorage.removeItem('token');
  }
}

// Export the singleton instance
const authService = new AuthService();
export const auth = authService as AuthMethods; 