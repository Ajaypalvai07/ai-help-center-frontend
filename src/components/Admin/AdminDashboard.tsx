import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useAppStore } from '../../store/useStore';

interface DashboardMetric {
  label: string;
  value: string | number;
  description: string;
}

export const AdminDashboard: React.FC = () => {
  const { user } = useAppStore();

  const metrics: DashboardMetric[] = [
    {
      label: 'Total Users',
      value: '1,234',
      description: 'Total number of registered users'
    },
    {
      label: 'Active Users',
      value: '789',
      description: 'Users active in the last 30 days'
    },
    {
      label: 'Total Conversations',
      value: '5,678',
      description: 'Total number of chat conversations'
    },
    {
      label: 'Resolution Rate',
      value: '94%',
      description: 'Percentage of successfully resolved queries'
    }
  ];

  if (user?.role !== 'admin') {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" color="error">
          Access Denied
        </Typography>
        <Typography variant="body1">
          You do not have permission to view this page.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
        {metrics.map((metric) => (
          <Paper
            key={metric.label}
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="h6" color="primary">
              {metric.label}
            </Typography>
            <Typography variant="h4" sx={{ my: 2 }}>
              {metric.value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {metric.description}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};