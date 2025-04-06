import { create } from 'zustand';
import { User } from '../types';

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  lastActivity: Date | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  updateLastActivity: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  lastActivity: null,
  setUser: (user: User) => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
  updateLastActivity: () => set({ lastActivity: new Date() }),
}));

// Re-export User type for convenience
export type { User };