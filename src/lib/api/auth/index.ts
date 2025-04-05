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
      baseURL: `${config.apiUrl}/auth`,
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
    return this.api.post<AuthResponse>('/login', { email, password });
  }

  async register(email: string, password: string, name: string): Promise<AxiosResponse<AuthResponse>> {
    return this.api.post<AuthResponse>('/register', { email, password, name });
  }

  async adminLogin(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return this.api.post<AuthResponse>('/admin/login', { email, password });
  }

  async verify(): Promise<AxiosResponse<{ user: AuthResponse['user'] }>> {
    return this.api.get<{ user: AuthResponse['user'] }>('/verify');
  }

  async logout(): Promise<AxiosResponse<void>> {
    localStorage.removeItem('token');
    return this.api.post<void>('/logout');
  }
}

// Export the singleton instance
const authService = new AuthService();
export const auth = authService as unknown as AuthMethods; 