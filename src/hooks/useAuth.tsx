import { createContext, useContext, useCallback, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/api/auth';
import type { AuthResponse, User } from '../lib/api/auth';
import { useAppStore } from '../store/useStore';

interface AuthContextType {
  login: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { setUser, clearUser } = useAppStore();

  const login = useCallback(async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await auth.login(email, password);
      if (!response?.data?.access_token || !response?.data?.user) {
        throw new Error('Invalid response from server');
      }
      
      const { access_token, user } = response.data;
      localStorage.setItem('token', access_token);
      setUser(user);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, [setUser]);

  const signOut = useCallback(() => {
    auth.logout();
    clearUser();
    navigate('/');
  }, [clearUser, navigate]);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      clearUser();
      return;
    }

    try {
      const response = await auth.verify();
      if (!response?.data?.user) {
        throw new Error('Invalid user data');
      }
      setUser(response.data.user);
    } catch (error) {
      console.error('Auth check error:', error);
      clearUser();
    }
  }, [setUser, clearUser]);

  return (
    <AuthContext.Provider value={{ login, signOut, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 