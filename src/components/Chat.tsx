import React, { useState, useEffect, useRef } from 'react';
import { Box, Paper, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { Message, ChatState } from '../types';
import { useAppStore } from '../store/useStore';
import { nanoid } from 'nanoid';

const Chat: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAppStore();

  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
    selectedCategory: null,
    solution: undefined
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || !user) return;

    const newMessage: Message = {
      id: nanoid(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date().toISOString(),
      userId: user.id
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));

    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: nanoid(),
        content: 'This is a simulated AI response.',
        role: 'assistant',
        timestamp: new Date().toISOString()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, aiResponse]
      }));
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          flex: 1, 
          p: 2, 
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        {chatState.messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '70%'
            }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 2,
                backgroundColor: message.role === 'user' ? 'primary.light' : 'grey.100'
              }}
            >
              <Typography>{message.content}</Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Paper>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={isLoading}
          multiline
          maxRows={4}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Send'}
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;