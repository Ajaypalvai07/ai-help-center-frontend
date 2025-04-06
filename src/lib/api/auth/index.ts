import axios, { AxiosResponse, AxiosInstance } from 'axios';

// Types
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

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

// Define the auth service interface
export interface IAuthService {
  login(email: string, password: string): Promise<AxiosResponse<AuthResponse>>;
  register(email: string, password: string, name: string): Promise<AxiosResponse<AuthResponse>>;
  adminLogin(email: string, password: string): Promise<AxiosResponse<AuthResponse>>;
  verify(): Promise<AxiosResponse<{ user: User }>>;
  logout(): Promise<void>;
}

// Implement the auth service
class AuthService implements IAuthService {
  private readonly api: AxiosInstance;
  private readonly debug: boolean;

  constructor(baseURL: string, debug = false) {
    this.debug = debug;

    if (this.debug) {
      console.log('🔧 Auth Service Configuration:', {
        baseURL,
        mode: import.meta.env.MODE
      });
    }

    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: true
    });

    // Add response interceptor for token handling
    this.api.interceptors.response.use(
      (response) => {
        if (response.data.access_token) {
          localStorage.setItem('token', response.data.access_token);
          this.api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
        }
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          delete this.api.defaults.headers.common['Authorization'];
        }
        return Promise.reject(error);
      }
    );

    // Add request interceptor to include token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    if (this.debug) {
      console.log('🔑 Login attempt:', { email });
    }

    try {
      // Validate input
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Create form data
      const formData = new URLSearchParams();
      formData.append('username', email.toLowerCase().trim());
      formData.append('password', password);

      const response = await this.api.post<AuthResponse>('/auth/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (this.debug) {
        console.log('✅ Login successful:', {
          userId: response.data.user.id,
          role: response.data.user.role
        });
      }

      return response;
    } catch (error: any) {
      console.error('❌ Login failed:', {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status
      });

      if (error.response?.status === 401) {
        throw new Error('Invalid email or password');
      } else if (error.response?.status === 500) {
        throw new Error('Server error during login. Please try again later.');
      }

      throw error;
    }
  }

  async register(email: string, password: string, name: string): Promise<AxiosResponse<AuthResponse>> {
    if (this.debug) {
      console.log('📝 Registration attempt:', { email, name });
    }

    try {
      // Validate input
      if (!email || !password || !name) {
        throw new Error('Email, password, and name are required');
      }

      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // Create the request payload
      const payload = {
        email: email.toLowerCase().trim(),
        password,
        name: name.trim()
      };

      const response = await this.api.post<AuthResponse>('/auth/register', payload);
      
      if (this.debug) {
        console.log('✅ Registration successful:', {
          userId: response.data.user.id,
          role: response.data.user.role
        });
      }

      return response;
    } catch (error: any) {
      console.error('❌ Registration failed:', {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      if (error.response?.status === 400) {
        throw new Error(error.response.data.detail || 'Invalid registration data');
      } else if (error.response?.status === 500) {
        throw new Error('Server error during registration. Please try again later.');
      }
      
      throw error;
    }
  }

  async adminLogin(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    if (this.debug) {
      console.log('👑 Admin login attempt:', { email });
    }

    try {
      // Validate input
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Create form data
      const formData = new URLSearchParams();
      formData.append('username', email.toLowerCase().trim());
      formData.append('password', password);

      const response = await this.api.post<AuthResponse>('/auth/admin/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (this.debug) {
        console.log('✅ Admin login successful:', {
          userId: response.data.user.id,
          role: response.data.user.role
        });
      }

      return response;
    } catch (error: any) {
      console.error('❌ Admin login failed:', {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status
      });

      if (error.response?.status === 401) {
        throw new Error('Invalid admin credentials');
      } else if (error.response?.status === 500) {
        throw new Error('Server error during admin login. Please try again later.');
      }

      throw error;
    }
  }

  async verify(): Promise<AxiosResponse<{ user: User }>> {
    try {
      return await this.api.get<{ user: User }>('/auth/verify');
    } catch (error: any) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Session expired. Please login again.');
      }
      throw error;
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem('token');
    delete this.api.defaults.headers.common['Authorization'];
  }
}

// Export singleton instance
export const auth = new AuthService(import.meta.env.VITE_API_URL, import.meta.env.DEV); 