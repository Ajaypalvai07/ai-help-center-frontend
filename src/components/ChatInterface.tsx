import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, ArrowLeft } from 'lucide-react';
import { useStore } from '../store';
import { chat } from '../lib/api';
import type { Message } from '../types';

export default function ChatInterface() {
  const navigate = useNavigate();
  const { chat: chatState, addMessage, setLoading, setError } = useStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('message') as HTMLInputElement;
    const message = input.value.trim();

    if (!message) return;

    try {
      setLoading(true);
      setError(null);

      const userMessage: Message = {
        id: Date.now().toString(),
        content: message,
        role: 'user',
        timestamp: new Date().toISOString(),
        userId: 'current-user'
      };
      addMessage(userMessage);

      const response = await chat.analyze({ content: message });
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data.message.content,
        role: 'assistant',
        timestamp: new Date().toISOString(),
        userId: 'ai-assistant',
        type: response.data.message.type || 'text'
      };
      addMessage(aiMessage);

      input.value = '';
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center p-4 border-b">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-semibold">Chat</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatState.messages.map((message: Message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex items-center gap-2">
          <input
            type="text"
            name="message"
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={chatState.isLoading}
          />
          <button
            type="submit"
            disabled={chatState.isLoading}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        {chatState.error && (
          <p className="mt-2 text-sm text-red-500">{chatState.error}</p>
        )}
      </form>
    </div>
  );
} 