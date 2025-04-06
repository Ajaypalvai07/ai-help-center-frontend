import { useState, useCallback } from 'react';
import { useAppStore } from '../store/useStore';
import type { Message } from '../types';
import { chat } from '../lib/api';

export function useAIChat() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAppStore();

  const sendMessage = useCallback(async (content: string, category?: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await chat.analyze({ content, category });
      
      if (!response.data) {
        throw new Error('No response data received');
      }

      const newMessage: Message = {
        id: response.data.id,
        content: response.data.message?.content || response.data.content,
        user_id: 'assistant',
        category: category || 'general',
        type: response.data.message?.type || 'text',
        role: 'assistant',
        timestamp: new Date().toISOString(),
        confidence: response.data.confidence
      };

      return newMessage;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get AI response';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    loading,
    error,
    sendMessage
  };
}