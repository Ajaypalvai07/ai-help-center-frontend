import { createContext, useContext, useCallback, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/api/auth';
import { useStore } from '../store/useStore';
import type { AuthResponse } from '../lib/api/auth';

interface AuthContextType {
  login: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { setUser, clearUser } = useStore();

  const login = useCallback(async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await auth.login(email, password);
      if (!response?.data?.token || !response?.data?.user) {
        throw new Error('Invalid response from server');
      }
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      return { token, user };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, [setUser]);

  const signOut = useCallback(() => {
    localStorage.removeItem('token');
    clearUser();
    navigate('/login');
  }, [clearUser, navigate]);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      signOut();
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
      signOut();
    }
  }, [setUser, signOut]);

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