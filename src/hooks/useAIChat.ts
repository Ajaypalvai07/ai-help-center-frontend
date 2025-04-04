import { useState, useCallback } from 'react';
import { useStore } from '../store/useStore';
import type { Message } from '../types';
import { chat } from '../lib/api';

export function useAIChat() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addMessage = useStore((state) => state.addMessage);

  const sendMessage = useCallback(async (content: string, category?: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await chat.analyze({ content, category });
      
      if (!response.data) {
        throw new Error('No response data received');
      }

      const message: Message = {
        id: crypto.randomUUID(),
        content: response.data.message.content,
        role: 'assistant',
        timestamp: new Date().toISOString(),
        type: response.data.message.type || 'text',
        category: category,
        userId: 'assistant'
      };

      addMessage(message);
      return message;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get AI response';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [addMessage]);

  return {
    loading,
    error,
    sendMessage
  };
}