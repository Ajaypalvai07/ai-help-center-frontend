import { create } from 'zustand';

export interface AppUser {
  id: string;
  email: string;
  name: string;
  role: string;
  is_active: boolean;
  created_at: string;
  last_login: string | null;
  preferences: Record<string, any>;
}

interface AppState {
  user: AppUser | null;
  isAuthenticated: boolean;
  lastActivity: Date | null;
  setUser: (user: AppUser) => void;
  clearUser: () => void;
  updateLastActivity: () => void;
}

const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  lastActivity: null,
  setUser: (user: AppUser) => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
  updateLastActivity: () => set({ lastActivity: new Date() }),
}));

export { useAppStore };