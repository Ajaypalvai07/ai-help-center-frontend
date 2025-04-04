import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Store, ChatState, User, Message, AdminMetrics } from '../types';
import { auth } from '../lib/api/auth';

const initialChatState: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
  selectedCategory: null
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      // Auth state
      auth: {
        user: null,
        isAuthenticated: false,
        lastActivity: null
      },

      // Chat state
      chat: initialChatState,

      // Admin metrics
      metrics: null,

      // Auth actions
      setUser: (user: User | null) => set((state) => ({
        auth: {
          ...state.auth,
          user,
          isAuthenticated: !!user,
          lastActivity: user ? new Date().toISOString() : null
        }
      })),

      clearUser: () => set(() => ({
        auth: {
          user: null,
          isAuthenticated: false,
          lastActivity: null
        }
      })),

      updateLastActivity: () => set((state) => ({
        auth: {
          ...state.auth,
          lastActivity: new Date().toISOString()
        }
      })),

      // Chat actions
      setChatState: (chatState: Partial<ChatState>) => set((state) => ({
        chat: { ...state.chat, ...chatState }
      })),

      clearChatState: () => set(() => ({
        chat: initialChatState
      })),

      addMessage: (message: Message) => set((state) => ({
        chat: {
          ...state.chat,
          messages: [...state.chat.messages, message]
        }
      })),

      setSolution: (solution: Message) => set((state) => ({
        chat: {
          ...state.chat,
          solution
        }
      })),

      // Admin metrics actions
      updateMetrics: (metrics: Partial<AdminMetrics>) => set((state) => ({
        metrics: state.metrics ? {
          totalUsers: metrics.totalUsers ?? state.metrics.totalUsers,
          totalMessages: metrics.totalMessages ?? state.metrics.totalMessages,
          resolvedIssues: metrics.resolvedIssues ?? state.metrics.resolvedIssues,
          resolutionRate: metrics.resolutionRate ?? state.metrics.resolutionRate,
          activeUsers: metrics.activeUsers ?? state.metrics.activeUsers,
          averageResponseTime: metrics.averageResponseTime ?? state.metrics.averageResponseTime
        } : {
          totalUsers: metrics.totalUsers ?? 0,
          totalMessages: metrics.totalMessages ?? 0,
          resolvedIssues: metrics.resolvedIssues ?? 0,
          resolutionRate: metrics.resolutionRate ?? '0%',
          activeUsers: metrics.activeUsers ?? 0,
          averageResponseTime: metrics.averageResponseTime ?? '0s'
        }
      })),

      // Additional actions
      setLoading: (loading: boolean) => set((state) => ({
        chat: { ...state.chat, isLoading: loading }
      })),

      setError: (error: string | null) => set((state) => ({
        chat: { ...state.chat, error }
      })),

      setChat: (chatState: ChatState) => set(() => ({
        chat: chatState
      })),

      // Auth methods
      login: async (email: string, password: string) => {
        try {
          const response = await auth.login(email, password);
          const { user, token } = response.data;
          if (!user || !token) {
            throw new Error('Invalid response from server');
          }
          return { user, token };
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },

      signOut: () => set(() => ({
        auth: {
          user: null,
          isAuthenticated: false,
          lastActivity: null
        },
        chat: initialChatState,
        metrics: null
      })),

      initializeAuth: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          set(() => ({
            auth: {
              user: null,
              isAuthenticated: false,
              lastActivity: null
            }
          }));
          return;
        }

        try {
          const response = await auth.verify();
          if (!response?.data?.user) {
            throw new Error('Invalid user data');
          }
          set((state) => ({
            auth: {
              ...state.auth,
              user: response.data.user,
              isAuthenticated: true,
              lastActivity: new Date().toISOString()
            }
          }));
        } catch (error) {
          console.error('Auth initialization error:', error);
          localStorage.removeItem('token');
          set(() => ({
            auth: {
              user: null,
              isAuthenticated: false,
              lastActivity: null
            }
          }));
        }
      }
    }),
    {
      name: 'app-store',
      partialize: (state) => ({ auth: { user: state.auth.user } })
    }
  )
);