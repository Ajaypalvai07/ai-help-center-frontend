import React from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';
import { useAppStore } from '../store/useStore';
import { useAuth } from '../hooks/useAuth';

export const UserProfile: React.FC = () => {
  const { user } = useAppStore();
  const { signOut } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Avatar
        sx={{ width: 100, height: 100, mb: 2 }}
        alt={user.name}
        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
      />
      
      <Typography variant="h5" component="h2">
        {user.name}
      </Typography>
      
      <Typography variant="body1" color="text.secondary">
        {user.email}
      </Typography>
      
      <Typography variant="body2" color="text.secondary">
        Role: {user.role}
      </Typography>
      
      <Typography variant="body2" color="text.secondary">
        Member since: {new Date(user.created_at).toLocaleDateString()}
      </Typography>
      
      <Button
        variant="outlined"
        color="primary"
        onClick={signOut}
        sx={{ mt: 2 }}
      >
        Sign Out
      </Button>
    </Box>
  );
}; 