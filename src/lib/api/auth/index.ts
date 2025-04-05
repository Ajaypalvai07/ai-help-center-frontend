import axios, { AxiosResponse, AxiosInstance, AxiosError } from 'axios';
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
      baseURL: config.apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
      validateStatus: (status) => status < 500,
    });

    // Add request interceptor for debugging
    this.api.interceptors.request.use((config) => {
      console.log('Making request to:', config.url, {
        method: config.method,
        headers: config.headers,
        data: config.data
      });
      
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Add response interceptor for debugging
    this.api.interceptors.response.use(
      (response) => {
        console.log('Received response:', {
          url: response.config.url,
          status: response.status,
          data: response.data
        });
        return response;
      },
      (error: AxiosError) => {
        console.error('Auth API Error:', {
          url: error.config?.url,
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
          config: {
            baseURL: error.config?.baseURL,
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers,
          }
        });
        return Promise.reject(error);
      }
    );
  }

  async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);
      
      console.log('Attempting login with:', { email });
      
      const response = await this.api.post<AuthResponse>('/api/v1/auth/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Login successful, token stored');
      }
      
      return response;
    } catch (error: any) {
      console.error('Login error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });

      if (error.response?.status === 401) {
        throw new Error('Invalid email or password');
      }
      if (error.response?.status === 500) {
        throw new Error('Server error. Please try again later.');
      }
      if (error.code === 'ECONNABORTED') {
        throw new Error('Connection timeout. Please check your internet connection.');
      }
      throw new Error(error.response?.data?.detail || 'Login failed');
    }
  }

  async register(email: string, password: string, name: string): Promise<AxiosResponse<AuthResponse>> {
    try {
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      if (name.length < 2) {
        throw new Error('Name must be at least 2 characters long');
      }

      const userData = {
        email,
        password,
        name,
        is_active: true,
        role: "user"
      };

      console.log('Sending registration request:', {
        url: `${config.apiUrl}/api/v1/auth/register`,
        data: { ...userData, password: '***' }
      });

      const response = await this.api.post<AuthResponse>('/api/v1/auth/register', userData);
      
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Registration successful, token stored');
      }
      
      return response;
    } catch (error: any) {
      console.error('Registration error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });

      if (error.response?.status === 400) {
        throw new Error(error.response.data.detail || 'Invalid registration data');
      }
      if (error.response?.status === 500) {
        throw new Error('Server error during registration. Please try again later.');
      }
      if (error.code === 'ECONNABORTED') {
        throw new Error('Connection timeout. Please check your internet connection.');
      }
      throw new Error(error.response?.data?.detail || 'Registration failed');
    }
  }

  async adminLogin(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);
      
      console.log('Attempting admin login with:', { email });
      
      const response = await this.api.post<AuthResponse>('/api/v1/auth/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.data?.user?.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
      }

      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Admin login successful, token stored');
      }

      return response;
    } catch (error: any) {
      console.error('Admin login error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });

      if (error.response?.status === 401) {
        throw new Error('Invalid admin credentials');
      }
      if (error.response?.status === 500) {
        throw new Error('Server error during admin login. Please try again later.');
      }
      throw new Error(error.response?.data?.detail || 'Admin login failed');
    }
  }

  async verify(): Promise<AxiosResponse<{ user: AuthResponse['user'] }>> {
    return this.api.get<{ user: AuthResponse['user'] }>('/api/v1/auth/verify');
  }

  async logout(): Promise<AxiosResponse<void>> {
    localStorage.removeItem('token');
    console.log('Token removed from storage');
    return this.api.post<void>('/api/v1/auth/logout');
  }
}

// Export the singleton instance
const authService = new AuthService();
export const auth = authService as AuthMethods; 