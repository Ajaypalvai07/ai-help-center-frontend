import axios, { AxiosResponse, AxiosInstance } from 'axios';

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
  private readonly baseURL: string;

  constructor() {
    this.debug = import.meta.env.VITE_DEBUG === 'true';
    this.baseURL = import.meta.env.VITE_API_URL;

    if (this.debug) {
      console.log('🔧 Auth Service Configuration:', {
        baseURL: this.baseURL,
        mode: import.meta.env.MODE
      });
    }

    this.api = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Add request interceptor for debugging
    this.api.interceptors.request.use((config) => {
      if (this.debug) {
        console.log('🚀 Auth Request:', {
          method: config.method,
          url: config.url,
          data: config.data,
          headers: config.headers,
          baseURL: config.baseURL,
          withCredentials: config.withCredentials
        });
      }
      return config;
    });

    // Add response interceptor for debugging
    this.api.interceptors.response.use(
      (response) => {
        if (this.debug) {
          console.log('✅ Auth Response:', {
            status: response.status,
            data: response.data,
            headers: response.headers
          });
        }
        return response;
      },
      (error) => {
        if (this.debug) {
          console.error('🚫 Auth Error:', {
            message: error.message,
            response: {
              status: error.response?.status,
              data: error.response?.data,
              headers: error.response?.headers
            },
            request: {
              url: error.config?.url,
              baseURL: error.config?.baseURL,
              data: error.config?.data,
              headers: error.config?.headers
            }
          });
        }
        
        // Handle specific error cases
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
        }
        
        throw error;
      }
    );
  }

  async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    if (this.debug) {
      console.log('🔑 Login attempt:', { email });
    }

    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
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
    } catch (error) {
      console.error('🚫 Login failed:', error);
      throw error;
    }
  }

  async register(email: string, password: string, name: string): Promise<AxiosResponse<AuthResponse>> {
    if (this.debug) {
      console.log('📝 Registration attempt:', { email, name });
    }

    try {
      const response = await this.api.post('/auth/register', {
        email,
        password,
        name
      });
      
      if (this.debug) {
        console.log('✨ Registration successful:', {
          userId: response.data.user.id,
          role: response.data.user.role
        });
      }
      
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }
      
      return response;
    } catch (error) {
      console.error('🚫 Registration failed:', error);
      throw error;
    }
  }

  async adminLogin(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    if (this.debug) {
      console.log('👑 Admin login attempt:', { email });
    }

    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    try {
      const response = await this.api.post('/auth/admin/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      if (this.debug) {
        console.log('👑 Admin login successful:', {
          userId: response.data.user.id,
          role: response.data.user.role
        });
      }
      
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }
      
      return response;
    } catch (error) {
      console.error('🚫 Admin login failed:', error);
      throw error;
    }
  }

  async verify(): Promise<AxiosResponse<{ user: AuthResponse['user'] }>> {
    if (this.debug) {
      console.log('🔍 Verifying token');
    }

    try {
      const token = localStorage.getItem('token');
      const response = await this.api.get('/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (this.debug) {
        console.log('✅ Token verification successful:', {
          userId: response.data.user.id,
          role: response.data.user.role
        });
      }
      
      return response;
    } catch (error) {
      console.error('🚫 Token verification failed:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    if (this.debug) {
      console.log('👋 Logging out');
    }
    localStorage.removeItem('token');
  }
}

// Export singleton instance
export const auth = new AuthService(); 