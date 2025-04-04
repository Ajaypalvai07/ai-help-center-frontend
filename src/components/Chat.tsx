import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, ArrowLeft, Mic, MicOff } from 'lucide-react';
import { categories, chat } from '../lib/api';
import { useStore } from '../store/index';
import { useVoiceInput } from '../hooks/useVoiceInput';
import type { Message } from '../types';

// Constants for storage
const MAX_MESSAGE_AGE = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const MAX_MESSAGES = 50; // Maximum number of messages to store

// Sanitize message content to prevent XSS
const sanitizeMessage = (content: string): string => {
  return content.replace(/[<>]/g, '');
};

// Add checkSession function
const checkSession = () => {
  const store = useStore.getState();
  if (!store.auth.lastActivity) return false;
  
  const lastActivityTime = new Date(store.auth.lastActivity).getTime();
  const inactiveTime = Date.now() - lastActivityTime;
  return inactiveTime < 30 * 60 * 1000; // 30 minutes
};

interface StoredMessages {
  messages: Message[];
  timestamp: number;
}

const Chat = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { auth, setChatState, updateLastActivity } = useStore();
  const [category, setCategory] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isRecording, startRecording, stopRecording, transcript } = useVoiceInput();

  // Check session on component mount and activity
  useEffect(() => {
    const checkActivity = () => {
      if (!checkSession()) {
        navigate('/', { replace: true });
      }
    };

    checkActivity();
    const interval = setInterval(checkActivity, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [navigate]);

  // Save messages to session storage and store
  useEffect(() => {
    if (categoryId && messages.length > 0) {
      const recentMessages = messages.slice(-MAX_MESSAGES);
      
      const storageData: StoredMessages = {
        messages: recentMessages,
        timestamp: Date.now()
      };
      sessionStorage.setItem(`chat_${categoryId}`, JSON.stringify(storageData));
      
      setChatState({
        messages: recentMessages,
        isLoading: loading,
        error: null
      });
    }
  }, [messages, categoryId, setChatState, loading]);

  // Handle category state
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/', { replace: true });
      return;
    }

    loadCategory();
    updateLastActivity();
  }, [categoryId, auth.isAuthenticated, navigate, updateLastActivity]);

  // Clear expired messages on component mount
  useEffect(() => {
    const clearExpiredMessages = () => {
      const keys = Object.keys(sessionStorage);
      keys.forEach(key => {
        if (key.startsWith('chat_')) {
          try {
            const data = JSON.parse(sessionStorage.getItem(key) || '');
            if (Date.now() - data.timestamp > MAX_MESSAGE_AGE) {
              sessionStorage.removeItem(key);
            }
          } catch (error) {
            sessionStorage.removeItem(key);
          }
        }
      });
    };

    clearExpiredMessages();
  }, []);

  // Handle page refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (categoryId) {
        sessionStorage.setItem('lastChatCategory', categoryId);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [categoryId]);

  // Restore chat on refresh
  useEffect(() => {
    const lastCategory = sessionStorage.getItem('lastChatCategory');
    if (!categoryId && lastCategory) {
      navigate(`/chat/${lastCategory}`, { replace: true });
    }
  }, [categoryId, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadCategory = async () => {
    try {
      if (!categoryId) {
        const lastCategory = sessionStorage.getItem('lastChatCategory');
        if (lastCategory) {
          navigate(`/chat/${lastCategory}`, { replace: true });
          return;
        }
        setError('Invalid category');
        navigate('/aihelpcentre');
        return;
      }

      const response = await categories.getById(categoryId);
      if (!response.data) {
        setError('Category not found');
        navigate('/aihelpcentre');
        return;
      }

      setCategory(response.data);
      setError(null);
    } catch (error) {
      console.error('Error loading category:', error);
      setError('Failed to load category');
      navigate('/aihelpcentre');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setError(null);

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: sanitizeMessage(input.trim()),
      role: 'user',
      timestamp: new Date().toISOString(),
      type: 'text',
      category: categoryId || undefined,
      userId: auth.user?.id || 'anonymous'
    };

    try {
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      scrollToBottom();

      const response = await chat.analyze({
        content: userMessage.content,
        category: userMessage.category
      });

      if (!response.data) throw new Error('No response data received');

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        content: sanitizeMessage(response.data.message.content),
        role: 'assistant',
        timestamp: new Date().toISOString(),
        type: response.data.message.type || 'text',
        category: categoryId || undefined,
        userId: 'assistant'
      };

      setMessages(prev => [...prev, aiMessage]);
      setChatState({
        messages: [...messages, userMessage, aiMessage],
        isLoading: false,
        error: null
      });
      updateLastActivity();
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to get response from AI. Please try again.');
      // Remove the user message if AI response failed
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
    } finally {
      setLoading(false);
    }
  };

  // Handle voice input
  useEffect(() => {
    if (isRecording && transcript) {
      setInput(transcript);
    }
  }, [transcript, isRecording]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm">
        <button
          onClick={() => navigate('/aihelpcentre')}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <h1 className="text-xl font-semibold text-gray-800">
          {category?.name || 'Chat'}
        </h1>
        <div className="w-20" /> {/* Spacer for alignment */}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-4 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <span className="text-xs opacity-75 mt-2 block">
                {new Date(message.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-2 rounded-full ${
              isRecording ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Chat;