import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { Message } from '../types';
import { useAppStore } from '../store';

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: string | null;
}

const Chat: React.FC = () => {
  const { user } = useAppStore();
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
    selectedCategory: null
  });

  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || chatState.isLoading) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date().toISOString(),
      user_id: user?.id || 'anonymous',
      category: chatState.selectedCategory || 'general'
    };

    setChatState((prev: ChatState) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      isLoading: true,
      error: null
    }));

    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: crypto.randomUUID(),
        content: 'This is a simulated AI response.',
        role: 'assistant',
        timestamp: new Date().toISOString(),
        user_id: 'assistant',
        category: chatState.selectedCategory || 'general'
      };

      setChatState((prev: ChatState) => ({
        ...prev,
        messages: [...prev.messages, aiResponse],
        isLoading: false
      }));
    }, 1000);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
      <Paper sx={{ flex: 1, mb: 2, p: 2, overflowY: 'auto' }}>
        {chatState.messages.map((message: Message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
              mb: 2
            }}
          >
            <Paper
              sx={{
                p: 2,
                maxWidth: '70%',
                backgroundColor: message.role === 'user' ? 'primary.light' : 'grey.100'
              }}
            >
              <Typography>{message.content}</Typography>
            </Paper>
          </Box>
        ))}
        {chatState.isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
      </Paper>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={chatState.isLoading}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!input.trim() || chatState.isLoading}
          sx={{ mt: 1 }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;